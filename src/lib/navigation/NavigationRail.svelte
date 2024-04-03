<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "../misc/Icon.svelte";
  import "@material/web/button/filled-button.js";
  import NavigationRailButton from "./NavigationRailButton.svelte";
</script>

<!-- https://m3.material.io/components/navigation-rail/overview -->

<div id="rail">
  <div id="logo">C</div>
  <div class="link-container">
    <NavigationRailButton icon="kid_star" label="Wizard" url="/wizard"
    ></NavigationRailButton>
    <NavigationRailButton icon="nature" label="Your Land" url="/land"
    ></NavigationRailButton>
    <NavigationRailButton icon="smart_toy" label="Steward" url="/robot"
    ></NavigationRailButton>
    <NavigationRailButton icon="monitoring" label="Stats" url="/"
    ></NavigationRailButton>
    <NavigationRailButton icon="settings" label="Settings" url="/"
    ></NavigationRailButton>
  </div>
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
