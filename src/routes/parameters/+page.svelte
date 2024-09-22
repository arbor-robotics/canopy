<script lang="ts">
	import type { Writable } from "svelte/store";
	import { writable } from "svelte/store";
	import { rosbridge_ip, rosbridge_port, addToast } from "$lib/stores";
	import { Button } from "bits-ui";

	function saveParameters() {}
</script>

<svelte:head>
	<title>Steward | Canopy</title>
	<meta name="description" content="Control and observe the robot" />
</svelte:head>

<div class="flex flex-col h-full w-full overflow-hidden max-w-2xl mx-auto p-8">
	<p class="text-5xl font-light my-4">Parameters</p>
	<hr />
	<p class="text-3xl font-light my-3">
		<span class="material-symbols-rounded"> hub </span> Rosbridge
	</p>

	<label for="ros_port" class="text-lg">IP</label>
	<input
		class="appearance-none border rounded w-full py-2 px-3 leading-normal mb-4"
		id="ros_ip"
		type="text"
		placeholder="IP"
		value={$rosbridge_ip}
	/>

	<label for="ros_port" class="text-lg">Port</label>
	<input
		class="appearance-none border rounded w-full py-2 px-3 leading-normal mb-4"
		id="ros_port"
		type="text"
		placeholder="Port"
		value={$rosbridge_port}
	/>
	<hr />

	<div class="flex flex-row justify-end mt-4">
		<Button.Root
			class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-meadow-500 text-white hover:bg-meadow-600 focus:outline-none focus:ring-2 ring-meadow-600 ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
			on:click={() =>
				addToast({ message: "Changes saved", type: "success" })}
		>
			Save
		</Button.Root>
	</div>
</div>
