<script lang="ts">
  import { onMount } from "svelte";

  // import { page } from "$app/stores";
  export let text: string = "Hello, world";
  export let character: string = "Druid";
  import { createEventDispatcher } from "svelte";

  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher();

  let synth: SpeechSynthesis;

  onMount(() => {
    synth = window.speechSynthesis;

    let voices = synth.getVoices();

    console.log(voices);

    speak();
  });

  function speak() {
    if (synth.speaking) {
      console.error("speechSynthesis.speaking");
      return;
    }

    if (text !== "") {
      const utterThis = new SpeechSynthesisUtterance(text);

      utterThis.onend = function (event) {
        console.log("SpeechSynthesisUtterance.onend");
        dispatch("doneSpeaking");
      };

      utterThis.onerror = function (event) {
        console.error(event);
      };

      synth.getVoices().forEach((voice) => {
        console.log(voice.name);
        if (voice.name.includes("David")) utterThis.voice = voice;
      });
      utterThis.pitch = 0.0;
      // utterThis.rate = rate.value;
      synth.speak(utterThis);
    }
  }
</script>

<div class="flex flex-row my-4" in:fade={{ duration: 500 }}>
  {#if character == "Druid"}
    <img src="res/druid-thick.svg" alt="" class="h-24" />
  {/if}
  <div
    class="border-4 rounded-3xl p-4 ml-4 text-lg border-neutral-600 speech-bubble font-medium"
  >
    {text}
  </div>
</div>

<style>
  .speech-bubble {
    border-color: #5b916f;
    color: #5b916f;
  }
</style>
