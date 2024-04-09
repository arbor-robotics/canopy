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
  });
</script>

<!-- 
<Icon id="link" color={connectionStatusColor} size="1.5rem"></Icon> -->
