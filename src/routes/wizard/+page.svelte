<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import Icon from "$lib/misc/Icon.svelte";
  import logo from "$lib/images/logo.svg";

  import "@material/web/progress/circular-progress";
  import "@material/web/button/text-button";
  import "@material/web/button/elevated-button";
  import "@material/web/fab/fab";
  import "@material/web/icon/icon";
  import {
    Button,
    Progress,
    Styles,
    Toast,
    ToastBody,
    ToastHeader,
  } from "@sveltestrap/sveltestrap";

  import ConnectionIndicator from "$lib/ros/ConnectionIndicator.svelte";
  import {
    connection_status,
    ConnectionStatus,
    node,
    BehaviorState,
    current_behavior_state,
    plan_progress,
    planting_eta,
    num_planted_seedlings,
    num_seedlings_in_plan,
  } from "$lib/stores";
  import World from "$lib/3d/World.svelte";
  import OsmMap from "$lib/misc/OsmMap.svelte";
  import MessageBox from "$lib/misc/MessageBox.svelte";
  import WizardButton from "$lib/navigation/WizardButton.svelte";
  import BehaviorStateIndicator from "$lib/ros/BehaviorStateIndicator.svelte";

  import { spring } from "svelte/motion";

  const displayed_seedling_count = spring();
  $: displayed_seedling_count.set($num_planted_seedlings);
  $: offset = modulo($displayed_seedling_count, 1);

  function modulo(n: number, m: number) {
    // handle negative numbers
    return ((n % m) + m) % m;
  }

  let current_step: number = 1;

  let geojson = undefined;
  let forest_plan_geojson_topic = undefined;
  let reqest_transition_client = undefined;

  node.subscribe((node) => {
    forest_plan_geojson_topic = new ROSLIB.Topic({
      ros: node,
      name: "/planning/bounds_geojson",
      messageType: "std_msgs/String",
    });

    reqest_transition_client = new ROSLIB.Service({
      ros: node,
      name: "/behavior/request_transition",
      serviceType: "steward_msgs/RequestTransition",
    });
  });

  let count = 0;
  let osmMap;
  let toast_header_text: string;
  let toast_body_text: string;
  let toast_color: string;
  let boundsOK = false;

  enum StewardBehaviorTransition {
    PLAY = 0,
    PAUSE = 1,
  }

  function publishPlantingPlan() {
    if (osmMap.getGeoJSON() == undefined) {
      showToast(
        "No bounds",
        "Trying drawing your planting area using the brush button in the top right.",
        "danger"
      );
      return;
    }

    let geometry = osmMap.getGeoJSON().geometry;

    if (geometry.coordinates.length > 1) {
      showToast(
        "Bounds should be contiguous",
        "Make sure that your bounds are a single, connected shape",
        "danger"
      );
      return;
    }

    geojson = JSON.stringify(osmMap.getGeoJSON().geometry);
    console.log(osmMap.getGeoJSON().geometry);
    var json_msg = {
      data: geojson,
    };
    forest_plan_geojson_topic.publish(json_msg);
    boundsOK = true;
    current_step++;
  }

  let isToastOpen = false;

  function toggleToast() {
    isToastOpen = !isToastOpen;
  }

  function openToast() {
    isToastOpen = true;
  }

  function onToastClose() {
    isToastOpen = false;
  }

  function showToast(
    title: string,
    description: string,
    color: string = "primary"
  ) {
    toast_color = color;
    toast_header_text = title;
    toast_body_text = description;
    openToast();
  }

  function goToStep1() {
    console.log("Moving to Step 1.");
    current_step = 1;
  }

  function goToStep2() {
    console.log("Moving to Step 2.");
    current_step = 2;
  }

  function confirmPlan() {
    current_step++;
    showToast(
      "Steward is ready to plant",
      "Click the ▶ button to start the mission",
      "success"
    );
  }

  function toggleStewardState() {
    let transition_request;
    if ($current_behavior_state == BehaviorState.PAUSED) {
      transition_request = {
        transition: StewardBehaviorTransition.PLAY,
      };
    } else {
      transition_request = {
        transition: StewardBehaviorTransition.PAUSE,
      };
    }
    reqest_transition_client.callService(
      transition_request,
      function (response) {
        console.log(
          `Transition response was ${response.success}: ${response.description}`
        );
      }
    );
  }
</script>

<svelte:head>
  <title>Canopy</title>
  <meta name="description" content="About this app" />
</svelte:head>

<Styles />

<div class="flex flex-row">
  <div id="rail" class="flex flex-column">
    <a id="logo" href="/"><img id="logo-img" src={logo} alt="Canopy logo" /></a>

    <div class="link-container">
      <WizardButton
        icon="lasso_select"
        label="Draw Bounds"
        selected={current_step == 1}
        on:click={goToStep1}
      ></WizardButton>
      <i class="bi bi-chevron-down opacity-30"></i>
      <WizardButton
        icon="map"
        label="Generate Plan"
        enabled={current_step > 1}
        selected={current_step == 2}
        on:click={goToStep2}
      ></WizardButton>
      <i class="bi bi-chevron-down opacity-30"></i>
      <WizardButton
        icon="rocket_launch"
        label="Launch Steward"
        enabled={current_step > 2}
        selected={current_step == 3}
      ></WizardButton>
    </div>

    <BehaviorStateIndicator />
    <div id="status"></div>
  </div>
  {#if current_step == 1}
    <OsmMap bind:this={osmMap} />
  {:else if current_step == 2}
    <World />
  {:else if current_step == 3}
    <World mode={"plant"} />
  {/if}
</div>

<div class="absolute bottom-0 right-0 pb-4 pr-4">
  {#if current_step == 1}
    <button on:click={publishPlantingPlan}>
      <md-elevated-button class="flex flex-row">
        Confirm Bounds</md-elevated-button
      >
    </button>
  {:else if current_step == 2}
    <button on:click={confirmPlan}>
      <md-elevated-button class="flex flex-row">
        Confirm Plan</md-elevated-button
      >
    </button>
  {:else if current_step == 3}
    <button on:click={toggleStewardState}>
      <md-elevated-button class="flex flex-row">
        {#if $current_behavior_state == BehaviorState.PAUSED}
          <Icon id="play_arrow" />
        {:else}
          <Icon id="pause" />
        {/if}
      </md-elevated-button>
    </button>
  {/if}
</div>

{#if current_step == 2 && $num_seedlings_in_plan < 1}
  <div
    class="absolute top-0 left-20 right-0 m-12 px-2 pointer-events-none flex flex-row items-center justify-center bg-white rounded-xl"
  >
    <div class="flex flex-row justify-center italic items-center">
      <Icon id="autorenew" spin></Icon>
      <p class="m-0">Generating Forest Plan</p>
    </div>
  </div>
{/if}

{#if current_step == 2 && $num_seedlings_in_plan > 0}
  <div
    class="absolute top-0 left-20 right-0 m-12 px-2 pointer-events-none flex flex-row items-center justify-center bg-white rounded-xl"
  >
    <p class="m-0 pr-4"><i class="bi bi-info-circle"></i></p>
    <p class="font-bold m-0 pr-4">
      {Math.floor($num_seedlings_in_plan)} seedlings.
    </p>
    <p class="italic m-0 pr-4">
      {Math.floor($num_seedlings_in_plan * 0.006 * 2000)} lbs CO2/year (temperate
      oak forest)
    </p>
  </div>
{/if}

{#if current_step == 3}
  <div
    class="absolute top-0 left-20 right-0 m-12 px-2 pointer-events-none flex flex-row items-center bg-white rounded-xl"
  >
    <p class="grow m-0 pl-4 text-center">
      <i class="bi bi-tree"></i>
      {Math.floor($displayed_seedling_count)}
    </p>
    {#if Math.ceil($plan_progress * 100) > 99}
      <Progress color="success" value={100} class="grow-[8]"
        >Planting complete</Progress
      >
    {:else}
      <Progress value={$plan_progress * 100} class="grow-[8]"
        >{Math.ceil($plan_progress * 100)}%</Progress
      >
    {/if}

    <p class="font-bold grow m-0 pl-4 text-center">
      <i class="bi bi-clock"></i>
      {Math.round($planting_eta / 60)} min
    </p>
  </div>
{/if}

<div
  class="absolute bottom-0 right-auto left-0 flex flex-row w-full justify-center pb-1"
>
  <Toast isOpen={isToastOpen} autohide duration={100} on:close={onToastClose}>
    <ToastHeader toggle={toggleToast} icon={toast_color}
      >{toast_header_text}</ToastHeader
    >
    <ToastBody>
      {toast_body_text}
    </ToastBody>
  </Toast>
</div>

<style>
  #logo {
    font-size: 2rem;
    font-family: "Bitter", serif;
    font-style: italic;
    margin-left: auto;
    margin-right: auto;
    padding-top: 1rem;
  }
  #logo-img {
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

  .counter-digits {
  }

  .hidden {
    top: -100%;
    user-select: none;
  }
</style>
