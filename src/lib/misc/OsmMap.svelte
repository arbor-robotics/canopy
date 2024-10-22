<script lang="ts">
  import { onMount } from "svelte";

  import { ego_alt, ego_lat, ego_lon } from "$lib/stores";

  // We need to wrap Leaflet in this onMount hook,
  // since it requires access to the window object.
  // No SSR!

  let paintpolygonControl;

  let map, flagIcon, egoIcon, egoMarker, egoLat, egoLon, L;

  let listening_for_waypoint = false;

  let waypoint_markers = [];

  export function listenForWaypoint() {
    listening_for_waypoint = true;
  }

  ego_lat.subscribe((val) => {
    // console.log("Latitude updated!");

    egoLat = val;

    if (L == undefined || !egoLon) return;

    if (!egoMarker)
      egoMarker = L.marker([egoLat, egoLon], { icon: egoIcon }).addTo(map);
    else {
      var newLatLng = new L.LatLng(egoLat, egoLon);
      egoMarker.setLatLng(newLatLng);
    }
  });

  ego_lon.subscribe((val) => {
    console.log("Longitude updated!");

    egoLon = val;

    if (L == undefined || !egoLat) return;

    if (!egoMarker)
      egoMarker = L.marker([egoLat, egoLon], { icon: egoIcon }).addTo(map);
    else {
      var newLatLng = new L.LatLng(egoLat, egoLon);
      egoMarker.setLatLng(newLatLng);
    }
  });

  function onMapClick(e) {
    // alert("You clicked the map at " + e.latlng);

    if (listening_for_waypoint) {
      var marker = L.marker(e.latlng, { icon: flagIcon }).addTo(map);
      waypoint_markers.push(marker);
      listening_for_waypoint = false;
      console.log(
        `There are now ${waypoint_markers.length} waypoints on the map.`,
      );
    } else {
      console.log("No event was triggered.");
    }
  }

  onMount(async () => {
    L = await import("leaflet");
    await import("leaflet-draw");
    await import("leaflet-paintpolygon");

    map = L.map("map").setView([40.44002092, -79.9409749], 19);

    flagIcon = L.divIcon({
      html: `<span class="material-symbols-outlined">
flag
</span>`,
      className: "div-icon",
    });

    egoIcon = L.divIcon({
      html: `<span class="material-symbols-outlined">
smart_toy
</span>`,
      className: "div-icon",
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    // Initialise the FeatureGroup to store editable layers
    // var editableLayers = new L.FeatureGroup();
    // map.addLayer(editableLayers);

    paintpolygonControl = L.control.paintPolygon({ menu: false }).addTo(map);

    map.on("click", onMapClick);
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

  .div-icon {
    /* background-color: white;
    width: 1rem;
    height: 1rem; */
  }
</style>
