<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import Icon from "$lib/misc/Icon.svelte";
  import "@material/web/progress/circular-progress";
  import "@material/web/button/text-button";
  import ConnectionIndicator from "$lib/ros/ConnectionIndicator.svelte";
  import World from "$lib/3d/World.svelte";
  import { connection_status, ConnectionStatus } from "$lib/stores";

  // onMount(async () => {
  //   console.log("Hello!");
  //   const module = await import("$lib/ros/roslib");

  //   var ros = new ROSLIB.Ros({
  //     url: "ws://localhost:9090",
  //   });

  //   // CONNECTION EVENTS
  //   ros.on("connection", function () {
  //     console.log("Connected to websocket server.");
  //     connection_status.set(ConnectionStatus.CONNECTED);
  //   });
  //   ros.on("error", function (error) {
  //     console.log("Error connecting to websocket server: ", error);
  //   });
  //   ros.on("close", function () {
  //     console.log("Connection to websocket server closed.");

  //     // setTimeout(ros.connect("ws://localhost:9090"));
  //   });
  // });
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

<h1>Wizard</h1>

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
  #wizard-container {
    width: 40vh;
    height: 40vh;
  }
  #wizard-progress {
    width: 100%;
    height: 100%;
    position: relative;
  }
  #wizard-button {
    width: 100%;
    height: 100%;
    top: -40vh;
    position: relative;
  }

  #wizard-label {
    top: -40vh;
    position: relative;
  }
</style>
