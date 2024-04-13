<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import Icon from "$lib/misc/Icon.svelte";
  import "@material/web/progress/circular-progress";
  import "@material/web/button/text-button";
  import "@material/web/button/elevated-button";
  import "@material/web/fab/fab";
  import "@material/web/icon/icon";
  import {
    Button,
    Styles,
    Toast,
    ToastBody,
    ToastHeader,
  } from "@sveltestrap/sveltestrap";

  import ConnectionIndicator from "$lib/ros/ConnectionIndicator.svelte";
  import { connection_status, ConnectionStatus, node } from "$lib/stores";
  import World from "$lib/3d/World.svelte";
  import OsmMap from "$lib/misc/OsmMap.svelte";
  import MessageBox from "$lib/misc/MessageBox.svelte";

  let geojson = undefined;
  let forest_plan_geojson_topic = undefined;

  onMount(async () => {
    const bootstrap = await import("bootstrap");
  });

  node.subscribe((node) => {
    forest_plan_geojson_topic = new ROSLIB.Topic({
      ros: node,
      name: "/planning/bounds_geojson",
      messageType: "std_msgs/String",
    });
  });

  let count = 0;
  let osmMap;
  let toast_header_text;
  let toast_body_text;
  let boundsOK = false;
  function publishPlantingPlan() {
    if (osmMap.getGeoJSON() == undefined) {
      showErrorToast(
        "No bounds",
        "Trying drawing your planting area using the brush button in the top right."
      );
      return;
    }

    let geometry = osmMap.getGeoJSON().geometry;

    if (geometry.coordinates.length > 1) {
      showErrorToast(
        "Bounds should be contiguous",
        "Make sure that your bounds are a single, connected shape"
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

  function showErrorToast(title: string, description: string) {
    toast_header_text = title;
    toast_body_text = description;
    openToast();
  }
</script>

<svelte:head>
  <title>Canopy</title>
  <meta name="description" content="About this app" />
</svelte:head>

<Styles />

<div
  class="wizard-steps shadow-xl py-2 rounded-lg flex-row flex justify-around align-middle"
>
  <div class="font-medium">Planting Bounds</div>
  <div class="my-auto">
    <Icon id="chevron_right"></Icon>
  </div>
  <div class="opacity-35">Forest Plan</div>
  <div class="my-auto">
    <Icon id="chevron_right"></Icon>
  </div>
  <div class="opacity-35">Route</div>
  <div class="my-auto">
    <Icon id="chevron_right"></Icon>
  </div>
  <div class="opacity-35">Start</div>
</div>

{#if boundsOK}
  <World />
{:else}
  <OsmMap bind:this={osmMap} />
{/if}

<div class="absolute bottom-0 right-0 pb-4 pr-4">
  <button on:click={publishPlantingPlan}>
    <md-elevated-button class="flex flex-row"> Done</md-elevated-button>
  </button>
</div>

<div
  class="absolute bottom-0 right-auto left-0 flex flex-row w-full justify-center pb-1"
>
  <Toast isOpen={isToastOpen} autohide duration={100} on:close={onToastClose}>
    <ToastHeader toggle={toggleToast} icon={"danger"}
      >{toast_header_text}</ToastHeader
    >
    <ToastBody>
      {toast_body_text}
    </ToastBody>
  </Toast>
</div>

<style>
  .wizard-steps {
    /* background-color: var(--md-sys-color-primary-container); */
  }
</style>
