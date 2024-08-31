<script>
  import Header from "./Header.svelte";
  import "../app.css";
  import "./styles.css";
  import "./style.scss";
  import "$lib/css/material/light.css";
  import "leaflet/dist/leaflet.css";
  import "leaflet-draw/dist/leaflet.draw.css";
  import NavigationRail from "../lib/navigation/NavigationRail.svelte";
  import ConnectionIndicator from "$lib/ros/ConnectionIndicator.svelte";
  import { connection_status, ConnectionStatus } from "$lib/stores";
  import RosListener from "$lib/ros/RosListener.svelte";
</script>

<div class="app overflow-hidden">
  <RosListener />

  {#if $connection_status == ConnectionStatus.CONNECTED}
    <NavigationRail></NavigationRail>
    <main class="p-0 overflow-hidden">
      <slot />
    </main>
  {:else}
    <ConnectionIndicator />
  {/if}

  <!-- <footer>
    <p>
      visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
    </p>
  </footer> -->
</div>

<style>
  .app {
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* max-width: 64rem; */
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>
