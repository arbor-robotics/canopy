<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "../misc/Icon.svelte";
  import "@material/web/button/filled-button.js";
  import NavigationRailButton from "./NavigationRailButton.svelte";
</script>

<!-- https://m3.material.io/components/navigation-rail/overview -->

<div class="rail">
  <NavigationRailButton icon="nature" isActive={true} label="Your Land"
  ></NavigationRailButton>
  <NavigationRailButton icon="smart_toy" isActive={false} label="Steward"
  ></NavigationRailButton>
  <NavigationRailButton icon="monitoring" isActive={false} label="Stats"
  ></NavigationRailButton>
  <NavigationRailButton icon="settings" isActive={false} label="Settings"
  ></NavigationRailButton>
</div>

<style>
  .rail {
    height: 100%;
    width: 5rem;
    background-color: #f5f5ee;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
