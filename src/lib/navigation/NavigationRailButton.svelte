<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "../misc/Icon.svelte";
  export let isActive: boolean = false;
  export let icon: string;
  export let label: string;
</script>

<!-- https://m3.material.io/components/navigation-rail/overview -->

<div class="rail-button">
  <div
    class="active-indicator"
    style="--active-color: {isActive
      ? 'var(--md-sys-color-secondary-container)'
      : 'none'}"
  >
    <Icon
      id={icon}
      color={isActive
        ? "var(--md-sys-color-on-secondary-container)"
        : "var(--md-sys-color-on-surface-variant)"}
    ></Icon>
  </div>
  <div id="label">{label}</div>
</div>

<style>
  #label {
    font-size: 0.75rem;
    font-weight: 500;
    padding-top: 0.25rem;
  }
  .rail-button {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .active-indicator {
    height: 2rem;
    width: 3.5rem;
    background-color: var(--active-color);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
</style>
