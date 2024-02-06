<script lang="ts">
  // import { page } from "$app/stores";
  export let id: string;
  export let color: string;
</script>

<div class="icon-container">
  <span class="material-symbols-outlined" style="--icon-color: {color}">
    {id}
  </span>
</div>

<style>
  .material-symbols-outlined {
    font-variation-settings:
      "FILL" 1,
      "wght" 400,
      "GRAD" 0,
      "opsz" 24;
    color: var(--icon-color);
  }
  .icon-container {
    user-select: none;
    background-color: var(--icon-color);
  }
</style>
