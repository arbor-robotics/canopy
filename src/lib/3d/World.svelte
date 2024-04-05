<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "three.meshline";
  // import "three.m"
  import CameraControls from "camera-controls";
  // import { path_msg, speed_cost, steering_cost } from "../stores.js";

  // import { STLLoader } from "three/addons/loaders/STLLoader.js";
  // import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  // import { listen } from "svelte/internal";

  // CameraControls.install({ THREE: THREE });

  // let speed_cost_msg = undefined;
  // let steering_cost_msg = undefined;
  // let speed_cost_texture = new THREE.DataTexture(
  //   new Uint8Array(91204),
  //   151,
  //   151
  // );
  // let steering_cost_texture = new THREE.DataTexture(
  //   new Uint8Array(91204),
  //   151,
  //   151
  // );
  // speed_cost_texture.needsUpdate = true;
  // steering_cost_texture.needsUpdate = true;

  // let canvas_rect = undefined;
  // let path_points = [];

  // let camera, cameraControls, renderer;
  // let container, stats;
  // let clock = new THREE.Clock();
  // let scene = undefined;
  // let path_line = new MeshLine();

  // speed_cost.subscribe((msg) => {
  //   speed_cost_msg = msg;

  //   if (msg == undefined) return;

  //   let gridWidth = msg.info.width,
  //     gridHeight = msg.info.height;
  //   let data = new Uint8Array(gridWidth * gridHeight * 4);

  //   for (let i = 0; i < gridWidth * gridHeight; i++) {
  //     const stride = i * 4;
  //     data[stride] = 255 - msg.data[i] * 2;
  //     data[stride + 1] = 255 - msg.data[i] * 2;
  //     data[stride + 2] = 255 - msg.data[i] * 1.5;
  //     data[stride + 3] = 255 - msg.data[i] * 1.5;
  //   }

  //   speed_cost_texture.image.data = data;
  //   speed_cost_texture.needsUpdate = true;

  //   // console.log("Created grid array with size "+gridWidth);
  // });

  // steering_cost.subscribe((msg) => {
  //   steering_cost_msg = msg;

  //   if (msg == undefined) return;

  //   let gridWidth = msg.info.width,
  //     gridHeight = msg.info.height;
  //   let data = new Uint8Array(gridWidth * gridHeight * 4);

  //   for (let i = 0; i < gridWidth * gridHeight; i++) {
  //     const stride = i * 4;
  //     data[stride] = 255 - msg.data[i] * 2;
  //     data[stride + 1] = 255 - msg.data[i] * 2;
  //     data[stride + 2] = 255 - msg.data[i] * 1.5;
  //     data[stride + 3] = 255;
  //   }

  //   steering_cost_texture.image.data = data;
  //   steering_cost_texture.needsUpdate = true;

  //   // console.log("Created grid array with size "+gridWidth);
  // });

  // path_msg.subscribe((msg) => {
  //   if (msg == undefined || scene == undefined) return;

  //   path_points = []; // Clear old contents

  //   for (let i = 0; i < msg.poses.length; i++) {
  //     let pos = msg.poses[i].pose.position;
  //     path_points.push(pos.x, pos.z + 0.1, pos.y * -1);
  //   }

  //   path_line.setPoints(path_points, (p) => 0.4);
  //   const material = new MeshLineMaterial({
  //     color: new THREE.Color(0x0ea5e9),
  //   });

  //   const mesh = new THREE.Mesh(path_line, material);
  //   scene.add(mesh);

  //   // path_line.geometry.attributes.position.array = path_points;
  //   // path_line.geometry.attributes.position.needsUpdate = true;
  // });

  // function init() {
  //   scene = new THREE.Scene();
  //   // scene.background = new THREE.Color(0xcccccc);
  //   scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

  //   container = document.getElementById("canvas");

  //   // (document.getElementById("canvas") || document.body).appendChild(container);

  //   camera = new THREE.PerspectiveCamera(
  //     60,
  //     window.innerWidth / window.innerHeight,
  //     1,
  //     100
  //   );
  //   const theta = Math.PI;
  //   const radius = 18;
  //   camera.position.x = radius * Math.cos(theta);
  //   camera.position.z = radius * Math.sin(theta);
  //   camera.position.y = 12;

  //   // Ground
  //   const speed_cost_plane = new THREE.Mesh(
  //     new THREE.PlaneGeometry(60, 60),
  //     new THREE.MeshBasicMaterial({
  //       map: speed_cost_texture,
  //       side: THREE.DoubleSide,
  //     })
  //   );
  //   speed_cost_plane.rotation.x = -Math.PI / 2;
  //   speed_cost_plane.position.x = 10.0;
  //   speed_cost_plane.position.y = 0.0;
  //   scene.add(speed_cost_plane);

  //   speed_cost_plane.receiveShadow = true;

  //   const steering_cost_plane = new THREE.Mesh(
  //     new THREE.PlaneGeometry(60, 60),
  //     new THREE.MeshBasicMaterial({
  //       map: steering_cost_texture,
  //       alphaMap: steering_cost_texture,
  //       side: THREE.DoubleSide,
  //       transparent: true,
  //     })
  //   );
  //   steering_cost_plane.rotation.x = -Math.PI / 2;
  //   steering_cost_plane.position.x = 10.0;
  //   steering_cost_plane.position.y = 0.0;
  //   scene.add(steering_cost_plane);

  //   steering_cost_plane.receiveShadow = true;

  //   // ASCII file
  //   const loader = new STLLoader();
  //   loader.load("../hailbopp.stl", function (geometry) {
  //     const material = new THREE.MeshPhongMaterial({
  //       color: 0xf1f5f9,
  //       specular: 0xf1f5f9,
  //       shininess: 30,
  //     });
  //     const mesh = new THREE.Mesh(geometry, material);

  //     mesh.rotation.set(-Math.PI / 2, 0, 0);
  //     mesh.position.set(0, 0.0, 0.0);

  //     mesh.castShadow = true;
  //     mesh.receiveShadow = true;

  //     scene.add(mesh);
  //   });

  //   // Lights

  //   const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
  //   hemiLight.color.setHSL(0.6, 1, 0.6);
  //   hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  //   hemiLight.position.set(0, 50, 0);
  //   scene.add(hemiLight);

  //   const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  //   dirLight.color.setHSL(0.1, 1, 0.95);
  //   dirLight.position.set(-1, 1.75, 1);
  //   dirLight.position.multiplyScalar(30);
  //   scene.add(dirLight);

  //   dirLight.castShadow = true;

  //   dirLight.shadow.mapSize.width = 2048;
  //   dirLight.shadow.mapSize.height = 2048;

  //   // renderer
  //   renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  //   renderer.setPixelRatio(window.devicePixelRatio);
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  //   renderer.outputEncoding = THREE.sRGBEncoding;

  //   renderer.shadowMap.enabled = true;

  //   container.appendChild(renderer.domElement);

  //   // controls
  //   cameraControls = new CameraControls(camera, renderer.domElement);
  //   cameraControls.maxDistance = 40.0;
  //   // cameraControls.rotate(Math.PI, 0, true);

  //   window.addEventListener("resize", onWindowResize);
  // }

  // function addShadowedLight(x, y, z, color, intensity) {
  //   const directionalLight = new THREE.DirectionalLight(color, intensity);
  //   directionalLight.position.set(x, y, z);
  //   scene.add(directionalLight);

  //   directionalLight.castShadow = true;

  //   const d = 1;
  //   directionalLight.shadow.camera.left = -d;
  //   directionalLight.shadow.camera.right = d;
  //   directionalLight.shadow.camera.top = d;
  //   directionalLight.shadow.camera.bottom = -d;

  //   directionalLight.shadow.camera.near = 1;
  //   directionalLight.shadow.camera.far = 4;

  //   directionalLight.shadow.bias = -0.002;
  // }

  // function onWindowResize() {
  //   camera.aspect = window.innerWidth / window.innerHeight;
  //   camera.updateProjectionMatrix();

  //   renderer.setSize(window.innerWidth, window.innerHeight);
  // }

  // function scaleToFit(container, node) {
  //   let rect = container.getBoundingClientRect();
  //   node.width = rect.width;
  //   node.height = rect.height;
  // }

  // function render() {
  //   renderer.render(scene, camera);
  // }

  // function animate() {
  //   requestAnimationFrame(animate);

  //   const delta = clock.getDelta();
  //   const elapsed = clock.getElapsedTime();
  //   const updated = cameraControls.update(delta);

  //   canvas_rect = container.getBoundingClientRect();

  //   render();
  // }

  // onMount(async () => {
  //   init();

  //   animate();
  // });
</script>

<!-- {#if speed_cost_msg != undefined}
  <pre>Time: {speed_cost_msg.header.stamp.sec}.{Math.floor(
      speed_cost_msg.header.stamp.nanosec / 1e8
    )}s</pre>
{/if} -->

<div id="canvas" class="h-full" />

<style>
</style>
