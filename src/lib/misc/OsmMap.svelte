<script lang="ts">
  import { onMount } from "svelte";

  import { ego_yaw, ego_lat, ego_lon, waypoints } from "$lib/stores";

  // We need to wrap Leaflet in this onMount hook,
  // since it requires access to the window object.
  // No SSR!

  let paintpolygonControl;

  let map, flagIcon, egoIcon, egoMarker, egoLat, egoLon, L;

  let listening_for_waypoint = false;

  let egoMarkerRotation = 0;

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

  ego_yaw.subscribe((val) => {
    if (L == undefined || !ego_yaw) return;

    console.log(val);

    let icon: HTMLDivElement = document.getElementById("ego-icon");
    if (!icon) return;

    let css_rotation = -val + Math.PI / 2;
    icon.style.transform = `rotate(${css_rotation}rad)`;
  });

  function onMapClick(e) {
    // alert("You clicked the map at " + e.latlng);

    if (listening_for_waypoint) {
      var marker = L.marker(e.latlng, { icon: flagIcon }).addTo(map);
      var prev_marker: L.Marker = waypoint_markers.pop();
      if (prev_marker != undefined) prev_marker.removeFrom(map);

      waypoint_markers.push(marker);
      listening_for_waypoint = false;
      console.log(
        `There are now ${waypoint_markers.length} waypoints on the map.`,
      );

      let latlons: Array<Array<number>> = [];

      waypoint_markers.forEach((marker: L.Marker) => {
        let latlon = marker.getLatLng();
        latlons.push([latlon.lat, latlon.lng]);
      });

      console.log(latlons);

      waypoints.set(latlons);
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
      html: `<div class="icon-container flex justify-center" id="ego-icon">
  <span
    class="material-symbols-rounded my-auto"
    style="--icon-color: #ff0000; --size: 1rem; --fill: 1"
  >
    navigation
  </span>
</div>`,
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

  export function startDraw() {
    paintpolygonControl.startDraw();
  }

  export function startErase() {
    paintpolygonControl.startErase();
  }

  export function startPan() {
    paintpolygonControl.stop();
  }

  // export
</script>

<div id="map" class="z-0"></div>

<style>
  #map {
    height: 100vh;
    width: 100%;
  }

  .material-symbols-rounded {
    font-variation-settings:
      "FILL" var(--fill),
      "wght" 400,
      "GRAD" 0,
      "opsz" 24;
    color: var(--icon-color);
    font-size: var(--size);
  }
  .icon-container {
    user-select: none;
    background-color: var(--icon-color);
    margin: 0;
  }
</style>
