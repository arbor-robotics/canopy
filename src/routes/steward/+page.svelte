<script lang="ts">
	import Joystick from "$lib/misc/Joystick.svelte";
	import type { TeleopCommand } from "$lib/stores";
	import { teleop_value } from "$lib/stores";
	import { Button } from "bits-ui";
	import type { Writable } from "svelte/store";
	import { writable } from "svelte/store";

	let joystick_value: Writable<TeleopCommand> = writable<TeleopCommand>();

	joystick_value.subscribe((value: TeleopCommand) => {
		teleop_value.set(value);
	});
</script>

<svelte:head>
	<title>Steward | Canopy</title>
	<meta name="description" content="Control and observe the robot" />
</svelte:head>

<Button.Root
	class="inline-flex h-12 items-center justify-center rounded-input bg-lime-300  rounded-xl
	px-[21px] text-[15px] font-semibold text-background shadow-mini
	hover:bg-dark/95 active:scale-98 active:transition-all"
>
	<span class="material-symbols-outlined"> arrow_upward </span>
</Button.Root>

<Joystick bind:value={joystick_value} />
