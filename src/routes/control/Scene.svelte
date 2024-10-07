<script>
  import { T } from "@threlte/core";
  import { Canvas } from "@threlte/core";
  import Steward from "$lib/3d/steward/warthog.svelte";
</script>

<T.Mesh>
  <T.BoxGeometry />
  <T.MeshBasicMaterial />
</T.Mesh>

<Steward />
