<script lang="ts">
  import { onMount } from "svelte";
  import * as THREE from "three";

  import { GUI } from "three/addons/libs/lil-gui.module.min.js";

  import { MapControls } from "three/addons/controls/MapControls.js";

  import { node } from "$lib/stores";

  import { TexturePainter } from "$lib/3d/TexturePainter";
  import type { ThreeMFLoader } from "three/examples/jsm/Addons.js";

  let forest_plan_msg = undefined;
  let steering_cost_msg = undefined;
  let tree_meshes: THREE.Mesh[] = [];
  let forest_plan_texture = new THREE.DataTexture(
    new Uint8Array(3235968),
    1272,
    1272
  );
  forest_plan_texture.needsUpdate = true;

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
        color: osmPalette.forest,
        flatShading: true,
      });

      // This tracks the centroid of all forest plan points.
      let centroid_x = 0;
      let centroid_y = 0;

      // Clear any existing tree meshes before adding the new ones
      for (var mesh of tree_meshes) {
        scene.remove(mesh);
      }
      tree_meshes = [];

      for (var point of msg.points) {
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

        centroid_x += point.x;
        centroid_y += point.y;
      }

      centroid_x /= msg.points.length;
      centroid_y /= msg.points.length;

      plane.position.x = centroid_x;
      plane.position.z = -centroid_y;

      console.log(`Centroid: (${centroid_x}, ${centroid_y})`);
    });
  });

  let osmPalette = {
    grass: 0xcdebb0,
    forest: 0xadd19e,
    water: 0xaad3df,
  };

  let camera: THREE.PerspectiveCamera,
    controls: MapControls,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer;

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let coneHelper: THREE.Mesh;
  let plane: THREE.Mesh;

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
    const intersects = raycaster.intersectObject(plane);

    // Toggle rotation bool for meshes that we clicked
    if (intersects.length > 0) {
      coneHelper.position.set(0, 0, 0);
      coneHelper.lookAt(intersects[0].face.normal);

      coneHelper.position.copy(intersects[0].point);
    }
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
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    // world

    const geometry = new THREE.PlaneGeometry(254.4, 254.4);
    const material = new THREE.MeshBasicMaterial({
      color: osmPalette.grass,
      side: THREE.DoubleSide,
    });
    plane = new THREE.Mesh(geometry, material);
    plane.position.x = 127.2;
    plane.position.z = 127.2;
    plane.rotateX(Math.PI / 2);
    scene.add(plane);

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

    const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper);

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

    const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
    scene.add(dirLightHelper);

    const geometryHelper = new THREE.CylinderGeometry(2, 2, 10, 20);
    geometryHelper.translate(0, 5, 0);
    // geometryHelper.rotateX(Math.PI / 2);
    coneHelper = new THREE.Mesh(geometryHelper, new THREE.MeshNormalMaterial());
    scene.add(coneHelper);

    //

    window.addEventListener("resize", onWindowResize);

    const canvas = renderer.domElement;

    canvas.addEventListener("pointermove", onPointerMove);

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
