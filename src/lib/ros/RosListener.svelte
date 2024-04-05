<script lang="ts">
  // import  from "../roslib";
  import Icon from "$lib/misc/Icon.svelte";
  import Map from "$lib/misc/Map.svelte";
  import { onMount } from "svelte";
  import { connectionStatus, ConnectionStatus } from "$lib/stores";
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

  onMount(async () => {
    console.log("Hello!");
    const module = await import("./roslib");

    var ros = new ROSLIB.Ros({
      url: "ws://localhost:9090",
    });

    // CONNECTION EVENTS
    ros.on("connection", function () {
      console.log("Connected to websocket server.");
      connectionStatus.set(ConnectionStatus.CONNECTED);
    });
    ros.on("error", function (error) {
      console.log("Error connecting to websocket server: ", error);
      connectionStatus.set(ConnectionStatus.ERROR);
    });
    ros.on("close", function () {
      console.log("Connection to websocket server closed.");
      connectionStatus.set(ConnectionStatus.DISCONNECTED);

      // setTimeout(ros.connect("ws://localhost:9090"));
    });

    var startWaypointClient = new ROSLIB.Service({
      ros: ros,
      name: "start_waypoint_manager",
      serviceType: "std_srvs/Trigger",
    });
  });

  //   var speed_cost_topic = new ROSLIB.Topic({
  //     ros: ros,
  //     name: "/grid/speed_cost",
  //     messageType: "nav_msgs/msg/OccupancyGrid",
  //   });
  //   speed_cost_topic.subscribe(function (msg) {
  //     speed_cost.set(msg);
  //   });

  //   var steering_cost_topic = new ROSLIB.Topic({
  //     ros: ros,
  //     name: "/grid/cost",
  //     messageType: "nav_msgs/msg/OccupancyGrid",
  //   });
  //   steering_cost_topic.subscribe(function (msg) {
  //     steering_cost.set(msg);
  //   });

  //   var path_topic = new ROSLIB.Topic({
  //     ros: ros,
  //     name: "/planning/path",
  //     messageType: "nav_msgs/msg/Path",
  //   });
  //   path_topic.subscribe(function (msg) {
  //     path_msg.set(msg);
  //   });

  //   var route_progress_topic = new ROSLIB.Topic({
  //     ros: ros,
  //     name: "/route_progress",
  //     messageType: "std_msgs/msg/Float32",
  //   });
  //   route_progress_topic.subscribe(function (msg) {
  //     route_progress_msg.set(msg);
  //   });

  //   var mode_topic = new ROSLIB.Topic({
  //     ros: ros,
  //     name: "/guardian/mode",
  //     messageType: "nova_msgs/msg/Mode",
  //   });
  //   mode_topic.subscribe(function (msg) {
  //     if (msg.mode == 0) current_mode.set(Mode.DISABLED);
  //     else if (msg.mode == 1) current_mode.set(Mode.MANUAL);
  //     else if (msg.mode == 2) current_mode.set(Mode.ACTIVE);
  //     else throw new Error('Received unknown mode "' + msg.mode + '"');
  //   });

  //   var diagnostic_topic = new ROSLIB.Topic({
  //     ros: ros,
  //     name: "/status",
  //     messageType: "diagnostic_msgs/msg/DiagnosticArray",
  //   });
  //   diagnostic_topic.subscribe(function (msg) {
  //     msg.status.forEach((status) => {
  //       global_status_message.set(status.message);
  //       if (status.name === "global") {
  //         switch (status.level) {
  //           case 0: {
  //             global_status_level.set(Level.OK);
  //             break;
  //           }
  //           case 1: {
  //             global_status_level.set(Level.WARN);
  //             break;
  //           }
  //           case 2: {
  //             global_status_level.set(Level.ERROR);
  //             break;
  //           }
  //           default: {
  //             throw new Error(
  //               'Received unknown status level "' + msg.level + '"'
  //             );

  //             break;
  //           }
  //         }
  //       }
  //     });
  //   });
  // });
  // // console.log(window);
  // // var ros = new ROSLIB.Ros({
  // //   url: "ws://localhost:9090",
  // // });
</script>

<Icon id="link" color={ConnectionStatusToColor[connectionStatus]} size="1.5rem"
></Icon>
