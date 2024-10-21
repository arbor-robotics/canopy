<script lang="ts">
  import { onMount } from "svelte";

  // We need to wrap Leaflet in this onMount hook,
  // since it requires access to the window object.
  // No SSR!

  let paintpolygonControl;

  onMount(async () => {
    const L = await import("leaflet");
    await import("leaflet-draw");
    await import("leaflet-paintpolygon");

    let map = L.map("map").setView([40.44002092, -79.9409749], 19);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    // Initialise the FeatureGroup to store editable layers
    // var editableLayers = new L.FeatureGroup();
    // map.addLayer(editableLayers);

    paintpolygonControl = L.control.paintPolygon().addTo(map);
  });

  export function getGeoJSON() {
    return paintpolygonControl.getData();
  }

  // export
</script>

<div id="map" class="z-0"></div>

<style>
  #map {
    height: 100vh;
    width: 100%;
  }
</style>
