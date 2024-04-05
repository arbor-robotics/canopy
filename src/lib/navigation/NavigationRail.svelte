<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "../misc/Icon.svelte";
  import "@material/web/button/filled-button.js";
  import NavigationRailButton from "./NavigationRailButton.svelte";
  import RosListener from "$lib/ros/RosListener.svelte";
  import logo from "$lib/images/logo.svg";
</script>

<!-- https://m3.material.io/components/navigation-rail/overview -->

<div id="rail">
  <a id="logo" href="/"><img id="logo-img" src={logo} alt="Canopy logo" /></a>

  <div class="link-container">
    <NavigationRailButton icon="kid_star" label="Wizard" url="/wizard"
    ></NavigationRailButton>
    <NavigationRailButton
      icon="nature"
      label="Your Land"
      url="/land"
      enabled={false}
    ></NavigationRailButton>
    <NavigationRailButton
      icon="smart_toy"
      label="Steward"
      url="/robot"
      enabled={false}
    ></NavigationRailButton>
    <NavigationRailButton
      icon="monitoring"
      label="Stats"
      url="/"
      enabled={false}
    ></NavigationRailButton>
    <NavigationRailButton
      icon="settings"
      label="Settings"
      url="/"
      enabled={false}
    ></NavigationRailButton>
  </div>
  <div id="status"><RosListener /></div>
</div>

<style>
  #rail {
    display: flex;
    flex-direction: column;
  }
  #logo {
    font-size: 2rem;
    font-family: "Bitter", serif;
    font-style: italic;
    margin-left: auto;
    margin-right: auto;
    padding-top: 1rem;
  }

  #logo-img {
    image-rendering: optimizeSpeed; /* STOP SMOOTHING, GIVE ME SPEED  */
    image-rendering: -moz-crisp-edges; /* Firefox                        */
    image-rendering: -o-crisp-edges; /* Opera                          */
    image-rendering: -webkit-optimize-contrast; /* Chrome (and eventually Safari) */
    image-rendering: pixelated; /* Universal support since 2021   */
    image-rendering: optimize-contrast; /* CSS3 Proposed                  */
    -ms-interpolation-mode: nearest-neighbor; /* IE8+                           */
    width: 2.5rem;
  }
  #status {
    font-size: 2rem;
    font-family: "Bitter", serif;
    font-style: italic;
    margin-left: auto;
    margin-right: auto;
    padding-top: 1rem;
  }
  .link-container {
    height: 100%;
    width: 5rem;
    background-color: #f5f5ee;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
