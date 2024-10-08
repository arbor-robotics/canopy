<script lang="ts">
  import { T, extend } from "@threlte/core";
  import { Canvas } from "@threlte/core";
  import Steward from "$lib/3d/steward/warthog.svelte";
  import { Grid } from "@threlte/extras";
  // import Controller from "./ThirdPersonControls.svelte";
  import { useThrelte, useParent, useTask } from "@threlte/core";
  import { AxesHelper } from "three";

  import Controller from "./ThirdPersonControls.svelte";

  let stewardModel: any;
  let stewardModelRef: any;
  $: if (stewardModel) {
    stewardModelRef = stewardModel;
  }
  // import { extend, T } from "threlte";

  useTask((delta) => {
    // the object's position is bound to the prop
    // console.log(delta);
  });
</script>

<T.PerspectiveCamera makeDefault fov={90} position={[0, 2, 6]}>
  <!-- <Controller bind:object={capRef} /> -->
  <Controller bind:object={stewardModelRef} />
</T.PerspectiveCamera>

<Steward bind:ref={stewardModel} />

<T.AxesHelper />
