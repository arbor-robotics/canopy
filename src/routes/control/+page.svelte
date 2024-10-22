<script lang="ts">
	import Joystick from "$lib/misc/Joystick.svelte";
	import { camera_image, type TeleopCommand } from "$lib/stores";
	import {
		teleop_value,
		wh_battery_voltage,
		platform_locked,
	} from "$lib/stores";
	import type { Writable } from "svelte/store";
	import { writable } from "svelte/store";
	import { Button, ToggleGroup } from "bits-ui";
	import Icon from "$lib/misc/Icon.svelte";
	import { Canvas } from "@threlte/core";
	import Scene from "./Scene.svelte";
	import World from "$lib/3d/World.svelte";
	import { map } from "d3";
	import OsmMap from "$lib/misc/OsmMap.svelte";
	import { fade, blur } from "svelte/transition";

	let map_view_active = false;

	let osmMap;

	let joystick_value: Writable<TeleopCommand> = writable<TeleopCommand>();

	let cached_teleop = undefined;

	joystick_value.subscribe((value: TeleopCommand) => {
		// Scale twist messages here to make the joystick more/less sensitive
		if (!value) return; // initially undefined
		let scaled_value = value;
		scaled_value.x *= -2;
		scaled_value.y *= 0.8;
		teleop_value.set(scaled_value);
		cached_teleop = value;
	});

	setInterval(() => {
		if (cached_teleop != undefined) teleop_value.set(cached_teleop);
	}, 0.1);

	let value: string[] | undefined = ["bold"];

	let camera_data: string = "";

	camera_image.subscribe((new_value) => {
		if (!new_value) return;
		camera_data = `data:image/jpg;base64,${new_value}`;
	});

	function toggleMapView() {
		map_view_active = !map_view_active;
	}

	function listenForWaypoint() {
		osmMap.listenForWaypoint();
	}
</script>

<svelte:head>
	<title>Steward | Canopy</title>
	<meta name="description" content="Control and observe the robot" />
</svelte:head>

<div class="flex flex-row h-full w-full overflow-hidden">
	<div class="w-full">
		{#if map_view_active}
			<div in:blur={{ duration: 300 }}><OsmMap bind:this={osmMap} /></div>
		{:else}
			<div in:blur={{ duration: 300 }}><World /></div>
		{/if}
	</div>
	<div id="topright" class="absolute top-0 right-0 p-4 flex flex-row">
		{#if map_view_active}
			<Button.Root
				class="py-3 px-4 mx-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-slate-50 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 ring-meadow-600 ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
				on:click={listenForWaypoint}
			>
				<Icon id="flag" size="1rem" color="" fill="0"></Icon>
				Add waypoint
			</Button.Root>
		{/if}
		<Button.Root
			class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-slate-50 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 ring-meadow-600 ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
			on:click={toggleMapView}
		>
			{#if map_view_active}
				<Icon id="my_location" size="1rem" color="" fill="0"></Icon>
				Ego view
			{:else}
				<Icon id="map" size="1rem" color="" fill="0"></Icon> Map view
			{/if}
		</Button.Root>
	</div>
	<div class="grow overflow-hidden">
		<div id="joystick-div" class="absolute bottom-0 right-0 flex flex-col">
			<div id="joystick-container" class="m-4 mb-0 mx-auto">
				<Joystick bind:value={joystick_value} />
			</div>
			<div class="inline-flex mx-6 justify-between">
				<div class="inline-flex" id="battery">
					<span class="material-symbols-outlined">
						battery_horiz_050
					</span>
					{$wh_battery_voltage}V
				</div>
				<div class="inline-flex" id="health">
					<span class="material-symbols-outlined symbol-filled">
						favorite
					</span>
					<span class="material-symbols-outlined symbol-filled">
						favorite
					</span>
					<span class="material-symbols-outlined symbol-filled">
						favorite
					</span>
					<span class="material-symbols-outlined symbol-filled">
						favorite
					</span>
					<span class="material-symbols-outlined"> favorite </span>
				</div>
			</div>
			{#if $platform_locked}
				<div class="inline-flex rounded-lg my-4 mx-auto">
					<div
						class="py-3 px-4 flex flex-row opacity-80 pointer-events-none justify-center w-48 gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium border border-gray-200 bg-slate-50 text-gray-800 shadow-sm"
					>
						<Icon id="lock" size="1rem" color=""></Icon>

						<p class="">E-Stop Active</p>
					</div>
				</div>
			{:else}
				<div class="inline-flex rounded-lg shadow-sm m-4">
					<Button.Root
						class="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-slate-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
					>
						Manual
					</Button.Root>
					<Button.Root
						class="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-slate-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
					>
						Auto
					</Button.Root>
					<Button.Root
						class="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-red-600 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
					>
						<!-- <span class="material-symbols-outlined text-base">
							pan_tool
						</span> -->
						Stop
					</Button.Root>
				</div>
			{/if}
		</div>
	</div>

	{#if camera_data == ""}
		<div
			class="w-[18rem] h-[12rem] absolute bottom-0 m-4 rounded-lg flex items-center justify-center border-2"
		>
			<span class="material-symbols-outlined text-4xl">
				videocam_off
			</span>
		</div>
	{:else}
		<img
			src={camera_data}
			alt="Camera stream"
			class="w-[24rem] h-[16rem] absolute bottom-0 m-4 rounded-lg"
		/>
	{/if}
</div>
