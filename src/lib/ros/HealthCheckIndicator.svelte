<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "../misc/Icon.svelte";
  import {
    connection_status,
    ConnectionStatus,
    node as nodeWritable,
    failed_checks,
  } from "$lib/stores";
  import { Popover, Separator, Toggle } from "bits-ui";
  import { fly } from "svelte/transition";

  let state_label: string = "?";
  // current_behavior_state.subscribe((value) => {
  //   if (value == BehaviorState.DRIVING) state_label = "D";
  //   else if (value == BehaviorState.PAUSED) state_label = "P";
  //   else if (value == BehaviorState.PLANTING) state_label = "Pl";
  //   else state_label = "?";
  // });
</script>

<Popover.Root>
  <Popover.Trigger
    class="inline-flex h-10
	items-center justify-center whitespace-nowrap rounded-input bg-dark px-[21px] text-[15px] font-medium text-background shadow-mini transition-all hover:cursor-pointer hover:bg-dark/95 active:scale-98"
  >
    {#each $failed_checks as check}
      {#if check.code == "BRIDGE_FAILURE"}
        <Icon id="flyover" color="#cc0000" size="2rem" />
      {:else if check.trigger_status.level == 3}
        🔴
      {:else if check.trigger_status.level == 2}
        🟠
      {:else}
        ?
      {/if}
    {/each}
  </Popover.Trigger>
  <Popover.Content
    class="z-30 w-full max-w-[328px] rounded-[12px] border border-dark-10 bg-white p-4 shadow-popover"
    transition={fly}
    transitionConfig={{ duration: 100 }}
    sideOffset={8}
    side="right"
  >
    <div class="flex flex-col">
      {#each $failed_checks as check}
        <div class="flex flex-row">
          {#if check.code == "BRIDGE_FAILURE"}
            <Icon id="flyover" color="#cc0000" size="2rem" />
          {:else if check.trigger_status.level == 3}
            🔴
          {:else if check.trigger_status.level == 2}
            🟠
          {:else}
            ?
          {/if}
          {check.message}
        </div>
      {/each}
    </div>
    <Separator.Root class="-mx-4 mb-6 mt-[17px] block h-px bg-dark-10" />
  </Popover.Content>
</Popover.Root>

<style>
  .disabled-button {
    opacity: 0.38;
    pointer-events: none;
  }
  #label {
    font-size: 2rem;
    font-weight: 500;
    padding-top: 0.25rem;
    color: var(--color-theme-1);
    pointer-events: none;
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
