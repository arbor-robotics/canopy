<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@2.0.3 warthog.glb --transform
-->

<script>
  import { Group } from "three";
  import { T, forwardEventHandlers } from "@threlte/core";
  import { useGltf } from "@threlte/extras";

  export const ref = new Group();

  const gltf = useGltf("/models/warthog-transformed.glb", { useDraco: true });

  const component = forwardEventHandlers();

  export let colors = {
    yellow: "#E8C72B",
    white: "#ffffff",
  };

  export let headlight_color = "#ff0000";
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Mesh
      geometry={gltf.nodes.antenna_estop.geometry}
      material={gltf.materials.Rubber}
      rotation={[0, 1.57, 0]}
    />
    <T.Mesh
      geometry={gltf.nodes.chassis.geometry}
      material={gltf.materials["Black Metal"]}
      rotation={[0, 1.57, 0]}
    >
      <T.Mesh
        geometry={gltf.nodes["susp-link"].geometry}
        material={gltf.materials["Black Metal"]}
      />
    </T.Mesh>
    <T.Mesh
      geometry={gltf.nodes["diff-link"].geometry}
      material={gltf.materials["Black Metal"]}
      rotation={[0, 1.57, 0]}
    />
    <T.Mesh geometry={gltf.nodes["e-stop"].geometry} rotation={[0, 1.57, 0]}>
      <T.MeshToonMaterial color={colors.yellow} />
    </T.Mesh>
    <T.Mesh
      geometry={gltf.nodes.fenders.geometry}
      material={gltf.materials["Yellow Metal"]}
      rotation={[Math.PI, 0, Math.PI]}
    >
      <T.MeshToonMaterial color={colors.yellow} />
    </T.Mesh>
    <T.Mesh
      geometry={gltf.nodes.Front_Headlight.geometry}
      material={gltf.nodes.Front_Headlight.material}
      rotation={[0, 1.57, 0]}
    >
      <T.MeshToonMaterial color={headlight_color} />
    </T.Mesh>
    <T.Mesh
      geometry={gltf.nodes.antenna_left.geometry}
      material={gltf.materials.Antenna}
      rotation={[0, 1.57, 0]}
    >
      <T.MeshToonMaterial color={colors.white} />
    </T.Mesh>
    <T.Mesh
      geometry={gltf.nodes.Wheel_RL.geometry}
      material={gltf.materials.Rubber}
    />
    <T.Mesh
      geometry={gltf.nodes.Rear_Headlight.geometry}
      material={gltf.materials.Red}
      rotation={[0, -Math.PI / 2, 0]}
    />
    <T.Mesh
      geometry={gltf.nodes.Wheel_RR.geometry}
      material={gltf.materials.Rubber}
    />
    <T.Mesh
      geometry={gltf.nodes.Wheel_FR.geometry}
      material={gltf.materials.Rubber}
    />
    <T.Mesh
      geometry={gltf.nodes.Wheel_FL.geometry}
      material={gltf.materials.Rubber}
    />
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
