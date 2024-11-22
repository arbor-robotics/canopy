<script lang="ts">
	import type { Writable } from "svelte/store";
	import { writable } from "svelte/store";
	import {
		rosbridge_ip,
		rosbridge_port,
		addToast,
		complete_plan,
	} from "$lib/stores";
	import {
		Button,
		Checkbox,
		ScrollArea,
		Tabs,
		Popover,
		Slider,
	} from "bits-ui";
	import Cookies from "js-cookie";
	import Icon from "$lib/misc/Icon.svelte";
	import {
		ForestGenerator,
		type PlantingPlan,
		type Species,
		ForestLayer,
	} from "$lib/forest_generator";
	import { onMount } from "svelte";
	import { base } from "$app/paths";
	import { fly, fade } from "svelte/transition";
	import OsmMap from "$lib/misc/OsmMap.svelte";
	import SpeciesCard from "$lib/misc/SpeciesCard.svelte";
	import SpeechBubble from "$lib/misc/SpeechBubble.svelte";

	function onGeneratorChanged() {
		console.log(generator.locations);

		osmMap.clearSeedlingMarkers();
		for (let [latlon, seedling] of generator.locations) {
			osmMap.addSeedlingMarker(latlon, seedling);
		}

		savePlan();
		publishPlanToRos();
	}

	let generator = new ForestGenerator(onGeneratorChanged);
	let species_options = generator.getSpeciesOptions();
	let included_species_count: number = generator.getIncludedSpeciesCount();
	let included_overstory_count: number = generator.getIncludedSpeciesCount(
		ForestLayer.OVERSTORY,
	);
	let included_understory_count: number = generator.getIncludedSpeciesCount(
		ForestLayer.UNDERSTORY,
	);
	let included_emergent_count: number = generator.getIncludedSpeciesCount(
		ForestLayer.EMERGENT,
	);
	let plan_name = "Schenley North";

	function publishPlanToRos() {
		let plan_obj: PlantingPlan = generator.toRos();
		complete_plan.set(plan_obj);
	}

	function savePlan() {
		let plan_string = generator.toString();
		localStorage.setItem(`plan`, JSON.stringify(plan_string));
		console.log(`Autosaved: ${plan_string.slice(0, 100)}...`);
	}

	function loadPlan() {
		let plan_string = localStorage.getItem(`plan`);
		console.log(plan_string);

		generator.loadFromString(plan_string);
		let plan_obj = JSON.parse(JSON.parse(plan_string));

		osmMap.setGeometry(plan_obj.geojson);
	}

	function loadPlanB() {
		let plan_string = localStorage.getItem(`plan-b`);
		console.log(plan_string);

		generator.loadFromString(plan_string);
		let plan_obj = JSON.parse(JSON.parse(plan_string));

		osmMap.setGeometry(plan_obj.geojson);
	}

	// onMount(() => {
	// 	setTimeout(loadPlan, 500);
	// });

	enum MapAction {
		DRAW,
		PAN,
		CLEAR,
		ERASE,
	}
	let osmMap: OsmMap;
	let current_action = MapAction.PAN;

	let selected_species_ids: Writable<Array<boolean>> = writable<
		Array<boolean>
	>([]);
	let num_species_included: number = 0;
	species_options.forEach((species) => {
		$selected_species_ids.push(species.included);
		if (species.included) num_species_included++;
	});

	function onSpeciesCardClicked(species: Species) {
		generator.markIncluded(species.page, !species.included);
		included_species_count = generator.getIncludedSpeciesCount();
		included_overstory_count = generator.getIncludedSpeciesCount(
			ForestLayer.OVERSTORY,
		);
		included_understory_count = generator.getIncludedSpeciesCount(
			ForestLayer.UNDERSTORY,
		);
		included_emergent_count = generator.getIncludedSpeciesCount(
			ForestLayer.EMERGENT,
		);

		generator.regeneratePoints();
	}

	function onMapGeomChanged() {
		console.log("REGEN");
		console.log(osmMap.getGeoJSON());
		generator.setGeoJSON(osmMap.getGeoJSON());
	}

	function startDraw() {
		osmMap.startDraw();
		current_action = MapAction.DRAW;
	}
	function startErase() {
		osmMap.startErase();
		current_action = MapAction.ERASE;
	}
	function startPan() {
		osmMap.startPan();
		current_action = MapAction.PAN;
	}

	let bubbleNumber = 8;

	function nextBubble() {
		console.log("Done speaking!!!");
	}

	let planting_density_slider_val: number[] = [0.6];
</script>

<svelte:head>
	<title>Steward | Canopy</title>
	<meta name="description" content="Control and observe the robot" />
</svelte:head>

<div class="size-full overflow-y-auto">
	<div class="size-full max-w-[40rem] mx-auto">
		<!-- <SpeechBubble text="I'm Druid." /> -->

		<SpeechBubble
			on:doneSpeaking={() => {
				bubbleNumber++;
			}}
			text="I'm Druid, a forest planning wizard that runs in your browser. That big yellow robot is Steward. Steward and I are partners in robotic reforestation."
		/>
		{#if bubbleNumber >= 2}
			<SpeechBubble
				on:doneSpeaking={() => {
					bubbleNumber++;
				}}
				text=" I can guide you through the forest planning process, and then I can send the final plan to Steward, who does the planting. I'm the brain, Steward is the muscle."
			/>
		{/if}
		{#if bubbleNumber >= 3}
			<SpeechBubble
				on:doneSpeaking={() => {
					bubbleNumber++;
				}}
				text="Say hello, Steward."
			/>
		{/if}
		{#if bubbleNumber >= 4}
			<hr class="bg-neutral-500 opacity-20 h-1" />
			<p class="text-4xl my-4 mx-auto text-center font-serif">
				Plan a forest
			</p>

			<SpeechBubble
				on:doneSpeaking={() => {
					bubbleNumber++;
				}}
				text="Let's plan a forest together. It's easy. First, use your finger to paint where you'd like your trees to go on the map."
			/>
		{/if}
		{#if bubbleNumber >= 5}
			<div class="rounded-2xl h-[36rem]">
				<OsmMap />
			</div>
		{/if}
		{#if bubbleNumber >= 6}
			<SpeechBubble
				on:doneSpeaking={() => {
					bubbleNumber++;
				}}
				text="You're a real Picasso. Are there any rivers or creeks near the planting area?"
			/>
			<div class="flex flex-row justify-end gap-4">
				<button
					class="text-lg border-4 rounded-3xl hover:border-spring-400 transition-all p-2 border-dashed font-medium flex flex-row items-center justify-center text-spring-400"
					><Icon id="check" color="#5b916f" size="1.5rem" />
					Yes</button
				>
				<button
					class="text-lg border-4 rounded-3xl hover:border-red-700 transition-all p-2 border-dashed font-medium flex flex-row items-center justify-center text-red-700"
					><Icon id="close" color="rgb(185 28 28)" size="1.5rem" />
					No</button
				>
			</div>
		{/if}
		{#if bubbleNumber >= 7}
			<SpeechBubble
				on:doneSpeaking={() => {
					bubbleNumber++;
				}}
				text="Are we planting on a hillside or other slope?"
			/>

			<div class="flex flex-row justify-end gap-4">
				<button
					class="text-lg border-4 rounded-3xl hover:border-spring-400 transition-all p-2 border-dashed font-medium flex flex-row items-center justify-center text-spring-400"
					><Icon id="check" color="#5b916f" size="1.5rem" />
					Yes</button
				>
				<button
					class="text-lg border-4 rounded-3xl hover:border-red-700 transition-all p-2 border-dashed font-medium flex flex-row items-center justify-center text-red-700"
					><Icon id="close" color="rgb(185 28 28)" size="1.5rem" />
					No</button
				>
			</div>
		{/if}
		{#if bubbleNumber >= 8}
			<SpeechBubble
				on:doneSpeaking={() => {
					bubbleNumber++;
				}}
				text="Very good. Based on your responses, I believe the following tree species will work well. Tap the ones that you'd like to include in the plan."
			/>
		{/if}
		{#if bubbleNumber >= 9}
			<SpeechBubble
				on:doneSpeaking={() => {
					bubbleNumber++;
				}}
				text="Now let me calculate the best placement of each seedling... Done. Shall we send this over to Steward?"
			/>
		{/if}
	</div>
</div>
