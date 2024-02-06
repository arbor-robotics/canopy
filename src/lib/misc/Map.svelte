<script lang="ts">
  import { onMount } from "svelte";

  // We need to wrap Leaflet in this onMount hook,
  // since it requires access to the window object.
  // No SSR!
  onMount(async () => {
    const L = await import("leaflet");
    await import("leaflet-draw");

    let map = L.map("map").setView([40.4401, -79.9467], 17);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    // Initialise the FeatureGroup to store editable layers
    var editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);

    var drawPluginOptions = {
      position: "topright",
      draw: {
        polygon: {
          allowIntersection: false, // Restricts shapes to simple polygons
          drawError: {
            color: "#e1e100", // Color the shape will turn when intersects
            message: "<strong>Oh snap!<strong> you can't draw that!", // Message that will show when intersect
          },
          shapeOptions: {
            color: "#97009c",
          },
        },
        // disable toolbar item by setting it to false
        polyline: false,
        circle: false, // Turns off this drawing tool
        rectangle: false,
        marker: false,
      },
      edit: {
        featureGroup: editableLayers, //REQUIRED!!
        remove: false,
      },
    };

    // Initialise the draw control and pass it the FeatureGroup of editable layers

    var drawControl = new L.Control.Draw(drawPluginOptions);

    map.addControl(drawControl);

    var editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);

    map.on("draw:created", function (e) {
      var type = e.layerType,
        layer = e.layer;

      if (type === "marker") {
        layer.bindPopup("A popup!");
      }

      editableLayers.addLayer(layer);
    });
  });
</script>

<div id="map">Hello, world!</div>

<style>
  #map {
    height: 100vh;
    width: 100%;
  }
</style>
