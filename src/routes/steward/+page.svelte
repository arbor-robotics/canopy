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

	let joystick_value: Writable<TeleopCommand> = writable<TeleopCommand>();

	let cached_teleop = undefined;

	joystick_value.subscribe((value: TeleopCommand) => {
		teleop_value.set(value);
		cached_teleop = value;
	});

	setInterval(() => {
		if (cached_teleop != undefined) teleop_value.set(cached_teleop);
	}, 0.1);

	let value: string[] | undefined = ["bold"];

	let camera_data: string = "";

	camera_image.subscribe((new_value) => {
		camera_data = `data:image/jpg;base64,${new_value}`;
	});
</script>

<svelte:head>
	<title>Steward | Canopy</title>
	<meta name="description" content="Control and observe the robot" />
</svelte:head>

<div class="flex flex-row h-full w-full overflow-hidden">
	<div class="w-[48rem]"></div>
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

	<img
		src={camera_data}
		alt="Camera stream"
		class="w-[24rem] h-[16rem] absolute bottom-0 m-4 rounded-lg"
	/>
</div>
