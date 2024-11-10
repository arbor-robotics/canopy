<script lang="ts">
	import type { Writable } from "svelte/store";
	import { writable } from "svelte/store";
	import { rosbridge_ip, rosbridge_port, addToast } from "$lib/stores";
	import { Button, Checkbox, ScrollArea } from "bits-ui";
	import Cookies from "js-cookie";
	import Icon from "$lib/misc/Icon.svelte";
	import { ForestGenerator } from "$lib/forest_generator";
	import { onMount } from "svelte";
	import { base } from "$app/paths";

	let generator = new ForestGenerator();
	let species_options = generator.getSpeciesOptions();

	onMount(() => {});

	function saveParameters() {
		// Rosbridge

		let rosbridge_ip_new = document.getElementById("ros_ip_input").value;
		let rosbridge_port_new =
			document.getElementById("ros_port_input").value;
		rosbridge_ip.set(rosbridge_ip_new);
		rosbridge_port.set(rosbridge_port_new);
		Cookies.set("rosbridge/ip", rosbridge_ip_new, { expires: 365 });
		Cookies.set("rosbridge/port", rosbridge_port_new, { expires: 365 });
		addToast({ message: "Changes saved", type: "success" });
	}

	let plans = [
		{ name: "Flagstaff North", co2: "2300 tonnes/year", species_count: 12 },
		{ name: "CFA Lawn", co2: "700 tonnes/year", species_count: 5 },
		{ name: "Frick Park East", co2: "3100 tonnes/year", species_count: 14 },
		{ name: "Panther Hollow", co2: "300 tonnes/year", species_count: 9 },
	];
</script>

<svelte:head>
	<title>Steward | Canopy</title>
	<meta name="description" content="Control and observe the robot" />
</svelte:head>

<div class="flex flex-col h-full w-full overflow-hidden max-w-2xl mx-auto p-8">
	<p class="text-4xl my-4">Let's plan your forest.</p>
	<div class="flex">
		<Icon id="counter_1" size="1.5rem" color="" fill="1"></Icon>
		<p class="text-xl pl-2 font-medium">What would you like to plant?</p>
	</div>
	<p class="text-md">
		Here are good options for <strong>Pittsburgh, PA</strong>. Check the
		boxes next to the seedlings you'd like to include.
	</p>

	<div
		class="w-full rounded-[10px] border border-gray-300 bg-background-alt px-2 py-4 shadow-card"
	>
		<ScrollArea.Root class="relative h-[205px] px-4">
			<ScrollArea.Viewport class="h-full w-full">
				<ScrollArea.Content>
					{#each species_options as species}
						<div class="flex flex-row">
							<img
								src="{base}/res/leaves/{species.icon}.svg"
								alt=""
								class="w-12 mr-2"
							/>
							<div class="flex flex-col">
								<p class="text-xl font-semibold">
									{species.common_name}
								</p>
								<div class="flex flex-row space-x-2">
									<div class="flex flex-row space-x-1">
										<Icon
											id="co2"
											size="1.5rem"
											color=""
											fill="0"
										></Icon>
										<p>{species.scientific_name}</p>
									</div>

									<div class="flex flex-row space-x-1">
										<Icon
											id="nature"
											size="1.5rem"
											color=""
											fill="0"
										></Icon>
										<p>{species.height_ft} ft</p>
									</div>
								</div>
							</div>
							<div class="flex flex-col grow">
								<Checkbox.Root
									id="terms"
									aria-labelledby="terms-label"
									class="peer ml-auto my-auto inline-flex size-[30px] items-center justify-center rounded-md border-2 border-gray-300 bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-gray-400"
								>
									<Checkbox.Indicator
										let:isChecked
										let:isIndeterminate
										class="inline-flex items-center justify-center text-background"
									>
										{#if isChecked}
											<Icon
												id="check"
												size="2rem"
												color=""
												fill="1"
											></Icon>
										{:else if isIndeterminate}
											<Icon
												id="counter_2"
												size="1.5rem"
												color=""
												fill="1"
											></Icon>
										{/if}
									</Checkbox.Indicator>
								</Checkbox.Root>
							</div>
						</div>

						<hr class="my-3" />
					{/each}
				</ScrollArea.Content>
			</ScrollArea.Viewport>
			<ScrollArea.Scrollbar
				orientation="vertical"
				class="flex h-full w-2.5 touch-none select-none rounded-full border-l border-l-transparent p-px transition-all hover:w-3 hover:bg-dark-10"
			>
				<ScrollArea.Thumb
					class="relative flex-1 rounded-full bg-muted-foreground opacity-40 transition-opacity hover:opacity-100"
				/>
			</ScrollArea.Scrollbar>
			<ScrollArea.Corner />
		</ScrollArea.Root>
	</div>
	<div class="flex flex-row justify-between mt-4">
		<p>0 seedlings selected.</p>
		<Button.Root
			class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-forest-600 text-white hover:bg-forest-700 focus:outline-none focus:ring-2 ring-forest-700 ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
			on:click={saveParameters}
		>
			Save
		</Button.Root>
	</div>
	<div class="flex">
		<Icon id="counter_2" size="1.5rem" color="" fill="0"></Icon>
		<p class="text-xl pl-2">Where would you like to plant?</p>
	</div>
	<div class="flex">
		<Icon id="counter_3" size="1.5rem" color="" fill="0"></Icon>
		<p class="text-xl pl-2">Name and save your plan.</p>
	</div>
	<div class="flex">
		<Icon id="counter_4" size="1.5rem" color="" fill="0"></Icon>
		<p class="text-xl pl-2">Send to Steward.</p>
	</div>
</div>
