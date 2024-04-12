<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import Icon from "$lib/misc/Icon.svelte";
  import "@material/web/progress/circular-progress";
  import "@material/web/button/text-button";
  import "@material/web/fab/fab";
  import "@material/web/icon/icon";

  import ConnectionIndicator from "$lib/ros/ConnectionIndicator.svelte";
  import { connection_status, ConnectionStatus, node } from "$lib/stores";
  import World from "$lib/3d/World.svelte";
  import OsmMap from "$lib/misc/OsmMap.svelte";
  import MessageBox from "$lib/misc/MessageBox.svelte";

  let geojson = undefined;
  let forest_plan_geojson_topic = undefined;

  node.subscribe((node) => {
    forest_plan_geojson_topic = new ROSLIB.Topic({
      ros: node,
      name: "/planning/bounds_geojson",
      messageType: "std_msgs/String",
    });

    var json_msg = {
      data: "YEET",
    };

    // forest_plan_geojson_topic.publish(json_msg);
  });

  let count = 0;
  let osmMap;
  function publishPlantingPlan() {
    //incremtent
    count++;
    console.log(JSON.stringify(osmMap.getGeoJSON().geometry));
    geojson = JSON.stringify(osmMap.getGeoJSON().geometry);
    var json_msg = {
      data: geojson,
    };
    forest_plan_geojson_topic.publish(json_msg);
  }
</script>

<svelte:head>
  <title>Canopy</title>
  <meta name="description" content="About this app" />
</svelte:head>

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
<!-- <World /> -->
<OsmMap bind:this={osmMap} />
<!-- <MessageBox /> -->

<div class="absolute bottom-0 right-0 pb-4 pr-4">
  <button on:click={publishPlantingPlan}
    ><md-fab aria-label="Edit">
      <md-icon slot="icon">play_arrow</md-icon>
    </md-fab></button
  >
</div>

<!-- 
<div id="wizard-container">
  <md-circular-progress
    id="wizard-progress"
    value={progressValue}
    indeterminate={progressIsIndeterminate}
  ></md-circular-progress>
  <md-text-button
    id="wizard-button"
    trailing-icon
    on:click={buttonClicked}
    on:keydown={buttonClicked}
    role="button"
    tabindex="0"
  >
    <Icon
      id="play_arrow"
      color="var(--md-sys-color-on-surface-variant)"
      size="8rem"
      fill="0"
    ></Icon>
  </md-text-button>
  <p id="wizard-label">Steward is ready</p>
</div> -->

<!-- <div class="text-column">
	<h1>About this app</h1>

	<p>
		This is a <a href="https://kit.svelte.dev">SvelteKit</a> app. You can make your own by typing the
		following into your command line and following the prompts:
	</p>

	<pre>npm create svelte@latest</pre>

	<p>
		The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading.
	</p>

	<p>
		The <a href="/sverdle">Sverdle</a> page illustrates SvelteKit's data loading and form handling. Try
		using it with JavaScript disabled!
	</p>
</div> -->

<style>
  .wizard-steps {
    /* background-color: var(--md-sys-color-primary-container); */
  }
</style>
