<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "../misc/Icon.svelte";
  export let icon: string;
  export let label: string;
  export let url: string;
  export let enabled: boolean = true;
</script>

<!-- https://m3.material.io/components/navigation-rail/overview -->

<a class={enabled ? "rail-button" : "rail-button disabled-button"} href={url}>
  <div
    class="active-indicator"
    style="--active-color: {$page.url.pathname == url
      ? 'var(--md-sys-color-secondary-container)'
      : 'none'}"
  >
    <Icon
      id={icon}
      color={$page.url.pathname == url
        ? "var(--md-sys-color-on-secondary-container)"
        : "var(--md-sys-color-on-surface-variant)"}
    ></Icon>
  </div>
  <div id="label">{label}</div>
</a>

<style>
  .disabled-button {
    opacity: 0.38;
    pointer-events: none;
  }
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
