<script lang="ts">
  // import  from "../roslib";
  import Icon from "$lib/misc/Icon.svelte";
  import Map from "$lib/misc/OsmMap.svelte";
  import { onMount } from "svelte";
  import {
    connection_status,
    ConnectionStatus,
    node as nodeWritable,
    BehaviorState,
    current_behavior_state,
    plan_progress,
    planting_eta,
    num_planted_seedlings,
    num_seedlings_in_plan,
  } from "$lib/stores";
  // import {
  //   is_connected,
  //   current_mode,
  //   Mode,
  //   global_status_level,
  //   global_status_message,
  //   Level,
  // } from "../guadian_store";

  // let connectionStatus: ConnectionStatus = ConnectionStatus.DISCONNECTED;

  let ConnectionStatusToColor: any = {};
  ConnectionStatusToColor[ConnectionStatus.CONNECTED] = "#16a34a";
  ConnectionStatusToColor[ConnectionStatus.DISCONNECTED] = "#404040";
  ConnectionStatusToColor[ConnectionStatus.ERROR] = "#b91c1c";
  let connectionStatusColor =
    ConnectionStatusToColor[ConnectionStatus.DISCONNECTED];

  onMount(async () => {
    console.log("Hello!");
    const module = await import("./roslib");

    let node = new ROSLIB.Ros({
      url: "ws://localhost:9090",
    });

    nodeWritable.set(node);
    // CONNECTION EVENTS
    node.on("connection", function () {
      console.log("Connected to websocket server.");
      connection_status.set(ConnectionStatus.CONNECTED);
    });
    node.on("error", function (error) {
      console.log("Error connecting to websocket server: ", error);
      connection_status.set(ConnectionStatus.ERROR);
    });
    node.on("close", function () {
      console.log("Connection to websocket server closed.");
      connection_status.set(ConnectionStatus.DISCONNECTED);

      setTimeout(node.connect("ws://localhost:9090"));
    });

    let current_behavior_state_topic = new ROSLIB.Topic({
      ros: node,
      name: "/behavior/current_state",
      messageType: "steward_msgs/State",
    });

    current_behavior_state_topic.subscribe(function (msg) {
      current_behavior_state.set(msg.value);
    });

    let plan_progress_topic = new ROSLIB.Topic({
      ros: node,
      name: "/planning/progress",
      messageType: "std_msgs/Float32",
    });

    plan_progress_topic.subscribe(function (msg) {
      plan_progress.set(msg.data);
    });

    let planting_eta_topic = new ROSLIB.Topic({
      ros: node,
      name: "/planning/eta",
      messageType: "std_msgs/Float32",
    });

    planting_eta_topic.subscribe(function (msg) {
      planting_eta.set(msg.data);
    });

    let num_planted_seedlings_topic = new ROSLIB.Topic({
      ros: node,
      name: "/planning/num_planted_seedlings",
      messageType: "std_msgs/Float32",
    });

    num_planted_seedlings_topic.subscribe(function (msg) {
      console.log(`Planted ${msg.data} seedlings`);

      num_planted_seedlings.set(msg.data);
    });

    let forest_plan_topic = new ROSLIB.Topic({
      ros: node,
      name: "/vis/forest_plan",
      messageType: "visualization_msgs/Marker",
    });

    forest_plan_topic.subscribe(function (msg) {
      if (msg == undefined) return;

      num_seedlings_in_plan.set(msg.points.length);
    });
  });
</script>

<!-- 
<Icon id="link" color={connectionStatusColor} size="1.5rem"></Icon> -->
