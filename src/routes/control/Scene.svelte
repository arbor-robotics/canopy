<script lang="ts">
  import { T, extend, useThrelte, useParent, useTask } from "@threlte/core";
  import { Canvas } from "@threlte/core";
  import Steward from "$lib/3d/steward/warthog.svelte";
  import { Grid } from "@threlte/extras";
  // import Controller from "./ThirdPersonControls.svelte";
  import { AxesHelper } from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
  import Controller from "./ThirdPersonControls.svelte";
  import { onMount } from "svelte";

  extend({
    OrbitControls,
  });

  const { renderer } = useThrelte();

  let stewardModel: any;
  let stewardModelRef: any;

  let orbit;
  $: if (stewardModel) {
    stewardModelRef = stewardModel;
  }
  // import { extend, T } from "threlte";

  useTask((delta) => {
    // the object's position is bound to the prop
    // console.log(delta);
  });

  onMount(() => {});
</script>

<T.PerspectiveCamera let:ref makeDefault position={[0, 6, -3]}>
  <T.OrbitControls
    args={[ref, renderer.domElement]}
    bind:ref={orbit}
    on:create={({ ref, cleanup }) => {
      // Look at the center
      ref.screenSpacePanning = false;
      ref.listenToKeyEvents(window); // optional

      //ref.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

      ref.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      ref.dampingFactor = 0.05;

      ref.screenSpacePanning = false;

      ref.minDistance = 3;
      ref.maxDistance = 10;

      ref.maxPolarAngle = Math.PI / 2;

      cleanup(() => {
        // Do something when the camera is disposed
      });
    }}
  />
</T.PerspectiveCamera>

<Steward bind:ref={stewardModel} />

<T.AxesHelper />
