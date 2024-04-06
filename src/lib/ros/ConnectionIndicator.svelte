<script lang="ts">
  // import { is_connected, warning_count, error_count } from "$lib/stores";

  import Icon from "$lib/misc/Icon.svelte";
</script>

<div class="flex flex-col justify-center mx-auto">
  <Icon id="link_off" size="10rem"></Icon>
  <p>Disconnected from Steward</p>
  <div class="flex flex-row justify-center italic">
    <Icon id="autorenew" spin></Icon>
    <p>Trying to reconnect</p>
  </div>
</div>

<style lang="postcss">
</style>
