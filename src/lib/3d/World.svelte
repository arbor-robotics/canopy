<script lang="ts">
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "three.meshline";

  import { GUI } from "three/addons/libs/lil-gui.module.min.js";

  import { MapControls } from "three/addons/controls/MapControls.js";

  import { node } from "$lib/stores";

  import TWEEN from "@tweenjs/tween.js";

  import { TexturePainter } from "$lib/3d/TexturePainter";
  import type { ThreeMFLoader } from "three/examples/jsm/Addons.js";

  let forest_plan_msg = undefined;
  let bounds_grid_msg = undefined;
  let bounds_plane: THREE.Mesh;
  let ground_plane: THREE.Mesh;

  let steering_cost_msg = undefined;
  let tree_meshes: THREE.Mesh[] = [];
  let bounds_texture: THREE.DataTexture | undefined = undefined;
  let plan_centroid_x = 0,
    plan_centroid_y = 0;
  let forestRadius = 0;

  export let mode = "plan";

  node.subscribe((node) => {
    let forest_plan_topic = new ROSLIB.Topic({
      ros: node,
      name: "/vis/forest_plan",
      messageType: "visualization_msgs/Marker",
    });

    forest_plan_topic.subscribe(function (msg) {
      if (msg == undefined) return;

      // Simple check to see if a UNIQUE forest plan has been received
      // Do the current plan and incoming plan have the same number of trees?
      if (
        forest_plan_msg != undefined &&
        forest_plan_msg.points.length === msg.points.length
      )
        return;

      forest_plan_msg = msg;

      const geometry = new THREE.CapsuleGeometry(1, 1, 4, 16);
      geometry.translate(0, 0.5, 0);

      const material = new THREE.MeshPhongMaterial({
        color: osmPalette.tree,
        transparent: true,
        opacity: 0.3,
        flatShading: true,
      });

      // This tracks the centroid of all forest plan points.

      // Clear any existing tree meshes before adding the new ones
      for (var mesh of tree_meshes) {
        scene.remove(mesh);
      }
      tree_meshes = [];

      // Ignore the first forest plan point, which is the robot's start position
      for (var point of msg.points.slice(1)) {
        // console.log(point.x);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = point.x;
        mesh.position.y = 0;
        mesh.position.z = -point.y;
        mesh.scale.x = 1;
        mesh.scale.y = Math.random() + 1;
        mesh.scale.z = 1;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        tree_meshes.push(mesh);
        scene.add(mesh);

        plan_centroid_x += point.x;
        plan_centroid_y += point.y;
      }

      plan_centroid_x /= msg.points.length;
      plan_centroid_y /= msg.points.length;

      if (mode == "plan") {
        camera.position.x = plan_centroid_x;
        camera.position.z = -plan_centroid_y;
        controls.target.x = plan_centroid_x;
        controls.target.z = -plan_centroid_y;
      }

      // if (bounds_plane != undefined) {
      //   bounds_plane.position.x = plan_centroid_x;
      //   bounds_plane.position.z = -plan_centroid_y;
      // }

      console.log(`Centroid: (${plan_centroid_x}, ${plan_centroid_y})`);
    });

    let bounds_grid_topic = new ROSLIB.Topic({
      ros: node,
      name: "/map/bounds",
      messageType: "nav_msgs/OccupancyGrid",
    });

    bounds_grid_topic.subscribe(function (msg) {
      if (msg == undefined) return;

      // if (bounds_grid_msg != undefined || msg == undefined) return;

      console.log(
        `Received bounds grid with dims ${msg.info.width}, ${msg.info.height}`
      );

      if (bounds_texture == undefined) {
        bounds_texture = new THREE.DataTexture(
          new Uint8Array(91204),
          msg.info.width,
          msg.info.height
        );
      }

      bounds_grid_msg = msg;

      let gridWidth = msg.info.width,
        gridHeight = msg.info.height,
        res = msg.info.resolution;

      forestRadius = Math.max(gridWidth, gridHeight) * res * 0.75;

      // 4 channels, RGBA
      let data = new Uint8Array(gridWidth * gridHeight * 4);

      let forestColor = new THREE.Color(osmPalette.forest);
      let grassColor = new THREE.Color(osmPalette.grass);
      for (let i = 0; i < gridWidth * gridHeight; i++) {
        let cellColor = msg.data[i] == 100 ? grassColor : forestColor;
        const stride = i * 4; // 4 channels, RGBA

        data[stride] = cellColor.r * 255;
        data[stride + 1] = cellColor.g * 255;
        data[stride + 2] = cellColor.b * 255;
        data[stride + 3] = 255;
      }

      scene.remove(bounds_plane);
      bounds_plane = new THREE.Mesh(
        new THREE.PlaneGeometry(gridWidth * res, gridHeight * res),
        new THREE.MeshBasicMaterial({
          map: bounds_texture,
          side: THREE.DoubleSide,
        })
      );
      bounds_plane.rotateX(-Math.PI / 2);
      bounds_plane.position.x =
        msg.info.origin.position.x + (gridWidth * res) / 2;
      bounds_plane.position.z =
        -msg.info.origin.position.y - (gridHeight * res) / 2;

      scene.add(bounds_plane);

      scene.remove(ground_plane);

      ground_plane = new THREE.Mesh(
        new THREE.CircleGeometry(forestRadius),
        new THREE.MeshBasicMaterial({
          color: osmPalette.grass,
        })
      );
      ground_plane.rotateX(-Math.PI / 2);
      ground_plane.position.x =
        msg.info.origin.position.x + (gridWidth * res) / 2;
      ground_plane.position.z =
        -msg.info.origin.position.y - (gridHeight * res) / 2;

      // This is just to prevent clipping
      ground_plane.position.y = bounds_plane.position.y - 0.01;
      scene.add(ground_plane);

      bounds_texture.image.data = data;
      bounds_texture.needsUpdate = true;
    });

    let odom_topic = new ROSLIB.Topic({
      ros: node,
      name: "/odom",
      messageType: "nav_msgs/Odometry",
    });

    odom_topic.subscribe(function (msg) {
      // console.log(msg.pose.pose.position);
      if (mode == "plant") {
        let ego_x = msg.pose.pose.position.x;
        let ego_y = msg.pose.pose.position.y;
        egoMesh.position.x = ego_x;
        egoMesh.position.z = -ego_y;
        egoRing.position.x = ego_x;
        egoRing.position.z = -ego_y;
        camera.position.x = ego_x;
        camera.position.z = -plan_centroid_y;
        controls.target.x = ego_x;
        controls.target.z = -ego_y;
      }

      // console.log(`Mesh now at ${egoMesh.position.x}, ${egoMesh.position.z}`);
    });

    let goal_pose_topic = new ROSLIB.Topic({
      ros: node,
      name: "/goal_pose",
      messageType: "geometry_msgs/PoseStamped",
    });

    goal_pose_topic.subscribe(function (msg) {
      if (mode == "plant") {
        waypointRing.position.x = msg.pose.position.x;
        waypointRing.position.z = -msg.pose.position.y;
      }
    });

    let global_plan_topic = new ROSLIB.Topic({
      ros: node,
      name: "/received_global_plan",
      messageType: "nav_msgs/Path",
    });

    global_plan_topic.subscribe(function (msg) {
      let points = [];
      const height_above_ground = 1.0; // meters
      const line_width = 1.0; // meters
      for (let pose of msg.poses) {
        let pos = pose.pose.position;
        points.push(pos.x, height_above_ground, -pos.y);
      }
      const line = new MeshLine();
      line.setPoints(points);

      const material = new MeshLineMaterial({
        color: new THREE.Color(osmPalette.green_highlight),
      });

      scene.remove(global_plan);
      global_plan = new THREE.Mesh(line, material);
      scene.add(global_plan);

      console.log(`Adding global plan with ${points.length} points`);
    });
  });

  let osmPalette = {
    blue: 0x0092da,
    forest: 0xadd19e,
    grass: 0xcdebb0,
    gray: 0xd9d0c9,
    green_highlight: 0x88e0be,
    tree: 0x95b887,
    water: 0xaad3df,
  };

  let camera: THREE.PerspectiveCamera,
    controls: MapControls,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer;

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let coneHelper: THREE.Mesh;

  let egoMesh: THREE.Mesh;
  let egoRing: THREE.Mesh;
  let waypointRing: THREE.Mesh;
  let global_plan: THREE.Mesh;

  function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // adjust displayBuffer size to match
    if (canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // update any render target sizes here
    }
  }

  function onPointerMove(event) {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components
    const canvas = renderer.domElement;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    pointer.x = (event.offsetX / width) * 2 - 1;
    pointer.y = -(event.offsetY / height) * 2 + 1;
    // console.log(pointer);

    raycaster.setFromCamera(pointer, camera);

    // See if the ray from the camera into the world hits one of our meshes
    const intersects = raycaster.intersectObject(ground_plane);

    // Toggle rotation bool for meshes that we clicked
    if (intersects.length > 0) {
      coneHelper.position.set(0, 0, 0);
      coneHelper.lookAt(intersects[0].face.normal);
      coneHelper.rotateX(-Math.PI / 2);

      coneHelper.position.copy(intersects[0].point);
      coneHelper.position.y = 0.5;
    }
  }

  function createPulsatingEffect() {
    // This changes the scale of the ring and creates the expanding pulse.
    new TWEEN.Tween(egoRing.scale)
      .to(new THREE.Vector3(2, 2, 2))
      .easing(TWEEN.Easing.Quadratic.Out)
      .repeat(Infinity)
      .start();

    // This changes the opacity which makes it show and fade away.
    new TWEEN.Tween(egoRing.material)
      .to({ opacity: 0 })
      .easing(TWEEN.Easing.Quadratic.Out)
      .repeat(Infinity)
      .start();

    // This changes the scale of the ring and creates the expanding pulse.
    new TWEEN.Tween(waypointRing.scale)
      .to(new THREE.Vector3(2, 2, 2))
      .easing(TWEEN.Easing.Quadratic.Out)
      .repeat(Infinity)
      .start();

    // This changes the opacity which makes it show and fade away.
    new TWEEN.Tween(waypointRing.material)
      .to({ opacity: 0 })
      .easing(TWEEN.Easing.Quadratic.Out)
      .repeat(Infinity)
      .start();
  }

  function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(osmPalette.water);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("map")?.appendChild(renderer.domElement);
    // document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(127.2, 254.4, 127.2);

    // controls

    controls = new MapControls(camera, renderer.domElement);

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 10;
    controls.maxDistance = 200;

    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;

    controls.target = new THREE.Vector3(127.2, 0, 127.2);

    // Helpers
    // const axesHelper = new THREE.AxesHelper(100);
    // scene.add(axesHelper);

    // world
    bounds_plane = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshBasicMaterial({
        map: bounds_texture,
        side: THREE.DoubleSide,
      })
    );
    scene.add(bounds_plane);
    // const geometry = new THREE.PlaneGeometry(254.4, 254.4);
    // const material = new THREE.MeshBasicMaterial({
    //   color: osmPalette.grass,
    //   side: THREE.DoubleSide,
    // });
    // plane = new THREE.Mesh(geometry, material);
    // plane.position.x = 127.2;
    // plane.position.z = 127.2;
    // plane.rotateX(Math.PI / 2);
    // scene.add(plane);

    // const forest_plan_plane = new THREE.Mesh(
    //   new THREE.PlaneGeometry(254.4, 254.4),
    //   new THREE.MeshBasicMaterial({
    //     map: forest_plan_texture,
    //     side: THREE.DoubleSide,
    //   })
    // );
    // forest_plan_plane.rotation.x = -Math.PI / 2;
    // forest_plan_plane.position.x = 10.0;
    // forest_plan_plane.position.y = 0.0;
    // scene.add(forest_plan_plane);

    // lights

    // FROM https://github.com/mrdoob/three.js/blob/master/examples/webgl_lights_hemisphere.html

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    // const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    // scene.add(hemiLightHelper);

    //

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-100, 175, 100);
    // dirLight.position.multiplyScalar(30);
    scene.add(dirLight);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    const d = 50;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.0001;

    // const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
    // scene.add(dirLightHelper);

    coneHelper = new THREE.Mesh(
      new THREE.CircleGeometry(1, 32),
      new THREE.MeshBasicMaterial({
        color: osmPalette.gray,
        transparent: true,
        opacity: 0.8,
      })
    );
    coneHelper.rotateX(-Math.PI / 2);
    coneHelper.position.y = 1.2;
    // scene.add(coneHelper);

    if (mode == "plant") {
      console.log("ADDING EGO MESHES");
      scene.remove(egoMesh);
      egoMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 3, 20),
        new THREE.MeshBasicMaterial({
          color: osmPalette.blue,
        })
      );
      scene.add(egoMesh);

      scene.remove(egoRing);
      egoRing = new THREE.Mesh(
        new THREE.CircleGeometry(1, 32),
        new THREE.MeshBasicMaterial({
          color: osmPalette.blue,
          transparent: true,
        })
      );
      egoRing.rotateX(-Math.PI / 2);
      egoRing.position.y = 1.2;
      scene.add(egoRing);

      scene.remove(waypointRing);
      waypointRing = new THREE.Mesh(
        new THREE.CircleGeometry(1, 32),
        new THREE.MeshBasicMaterial({
          color: osmPalette.green_highlight,
          transparent: true,
        })
      );
      waypointRing.rotateX(-Math.PI / 2);
      waypointRing.position.y = 1.2;
      scene.add(waypointRing);
    }

    //

    window.addEventListener("resize", onWindowResize);

    const canvas = renderer.domElement;

    // canvas.addEventListener("pointermove", onPointerMove);

    // const gui = new GUI();
    // gui.add(controls, "zoomToCursor");
    // gui.add(controls, "screenSpacePanning");
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    resizeCanvasToDisplaySize();
    TWEEN.update();

    requestAnimationFrame(animate);

    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    render();
  }

  function render() {
    // raycaster.setFromCamera(pointer, camera);
    // // calculate objects intersecting the picking ray
    // const intersects = raycaster.intersectObjects(scene.children, false);

    // for (let i = 0; i < intersects.length; i++) {
    //   intersects[i].object.material.color.set(0xff0000);
    // }
    renderer.render(scene, camera);
  }

  // We need to wrap Leaflet in this onMount hook,
  // since it requires access to the window object.
  // No SSR!
  onMount(async () => {
    init();
    if (mode == "plant") createPulsatingEffect();
    animate();
  });
</script>

<div id="map"></div>

<style>
  #map {
    height: 100vh;
    width: 100%;
  }

  canvas {
    height: 100%;
    width: 100%;
  }
</style>
