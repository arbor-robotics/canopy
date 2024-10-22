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
    teleop_value,
    type TeleopCommand,
    rosbridge_ip,
    rosbridge_port,
    camera_image,
    diagnostic_agg,
    wh_battery_voltage,
    platform_locked,
    failed_checks,
    occ_grid,
    bounds_geojson,
    heartbeat_toggle,
    ego_lat,
    ego_lon,
    ego_alt,
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

  let node = undefined;

  type TwistMsg = {
    linear: {
      x?: number;
      y?: number;
      z?: number;
    };
    angular: {
      x?: number;
      y?: number;
      z?: number;
    };
  };

  let ConnectionStatusToColor: any = {};
  ConnectionStatusToColor[ConnectionStatus.CONNECTED] = "#16a34a";
  ConnectionStatusToColor[ConnectionStatus.DISCONNECTED] = "#404040";
  ConnectionStatusToColor[ConnectionStatus.ERROR] = "#b91c1c";
  let connectionStatusColor =
    ConnectionStatusToColor[ConnectionStatus.DISCONNECTED];

  // Refresh the Rosbridge connection if the IP changes
  rosbridge_ip.subscribe((value) => {
    // Wait until the page has finished loading and onMount has been called
    if (!node) return;
    if (value == undefined) {
      console.log(`Rosbridge port was ${value}, skipping.`);
      return;
    }

    setupRosBridge();
  });

  // Refresh the Rosbridge connection if the port changes
  rosbridge_port.subscribe((value) => {
    // Wait until the page has finished loading and onMount has been called
    if (!node) return;
    if (value == undefined) {
      console.log(`Rosbridge port was ${value}, skipping.`);
      return;
    }

    setupRosBridge();
  });

  async function setupRosBridge() {
    let url = `ws://${$rosbridge_ip}:${$rosbridge_port}`;
    console.log(`Trying to connect to Steward at ${url}`);
    const module = await import("./roslib");

    node = new ROSLIB.Ros({
      url: url,
    });

    nodeWritable.set(node);
    // CONNECTION EVENTS
    node.on("connection", function () {
      console.log("Connected to Steward.");
      connection_status.set(ConnectionStatus.CONNECTED);
    });
    node.on("error", function (error) {
      console.log("Error connecting to websocket server: ", error);
      // location.reload(); // Reload the page

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

    let test_topic = new ROSLIB.Topic({
      ros: node,
      name: "/test",
      messageType: "std_msgs/Empty",
    });

    test_topic.subscribe(function (msg) {
      // planting_eta.set(msg.data);
      console.log(msg);
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

    let bounds_geojson_topic = new ROSLIB.Topic({
      ros: node,
      name: "/cost/bounds",
      messageType: "std_msgs/String",
    });

    bounds_geojson.subscribe((geojson) => {
      console.log(`PUBLISHING ${geojson}`);
      var json_msg = {
        data: geojson,
      };

      bounds_geojson_topic.publish(json_msg);
    });

    let global_heartbeat_topic = new ROSLIB.Topic({
      ros: node,
      name: "/hb/global",
      messageType: "std_msgs/Empty",
    });

    global_heartbeat_topic.subscribe((msg) => {
      heartbeat_toggle.set(!$heartbeat_toggle);
    });

    let gnss_fix_topic = new ROSLIB.Topic({
      ros: node,
      name: "/gnss/fix",
      messageType: "sensor_msgs/NavSatFix",
    });

    gnss_fix_topic.subscribe((msg) => {
      // console.log(msg.latitude);
      ego_alt.set(msg.altitude);
      ego_lon.set(msg.longitude);
      ego_lat.set(msg.latitude);
    });

    let camera_image_topic = new ROSLIB.Topic({
      ros: node,
      name: "/zed/left/image_rect_color/compressed",
      messageType: "sensor_msgs/CompressedImage",
      queue_size: 1,
      throttle_rate: 100,
    });

    camera_image_topic.subscribe(function (msg) {
      if (msg == undefined) return;

      camera_image.set(msg.data);
    });

    let health_check_topic = new ROSLIB.Topic({
      ros: node,
      name: "/health/failed_checks",
      messageType: "steward_msgs/FailedChecks",
    });

    health_check_topic.subscribe(function (msg) {
      if (msg == undefined) return;

      // console.log(msg);
      failed_checks.set(msg["checks"]);
    });

    let occ_grid_topic = new ROSLIB.Topic({
      ros: node,
      name: "/cost/occupancy",
      messageType: "nav_msgs/OccupancyGrid",
    });

    occ_grid_topic.subscribe(function (msg) {
      if (msg == undefined) return;

      occ_grid.set(msg);
    });

    let diagnostics_topic = new ROSLIB.Topic({
      ros: node,
      name: "/diagnostics/agg",
      messageType: "diagnostic_msgs/DiagnosticArray",
    });

    diagnostics_topic.subscribe(function (msg) {
      if (msg == undefined) return;

      diagnostic_agg.set(msg);

      // Extract battery voltage
      msg.status.forEach((stat) => {
        if (stat.name == "/Warthog Base/General/Battery") {
          stat.values.forEach((kv) => {
            if (kv.key == "Battery Voltage (V)") {
              // Round to 1 decimal place
              let rounded_voltage = kv.value;
              rounded_voltage *= 10;
              rounded_voltage = Math.floor(rounded_voltage) / 10;
              wh_battery_voltage.set(rounded_voltage);
            }
          });
        } else if (stat.name == "/Warthog Base/E-Stop") {
          stat.values.forEach((kv) => {
            if (kv.key == "warthog_node: MCU Status") {
              // console.log(kv.value);
              if (kv.value == "Stop loop open, platform immobilized.") {
                platform_locked.set(true);
              } else {
                platform_locked.set(false);
              }
            }
          });
        }
      });

      // console.log(msg);
    });

    let teleop_topic = new ROSLIB.Topic({
      ros: node,
      name: "/cmd_vel",
      messageType: "geometry_msgs/Twist",
    });

    teleop_topic.advertise();

    teleop_value.subscribe((value: TeleopCommand) => {
      if (!value) return;
      let msg: TwistMsg = {
        linear: {
          x: -value.y,
        },
        angular: {
          z: value.x,
        },
      };
      teleop_topic.publish(msg);
      console.log(`Publishing: ${msg}`);
    });
  }

  onMount(async () => {
    await setupRosBridge();
  });
</script>

<!-- 
<Icon id="link" color={connectionStatusColor} size="1.5rem"></Icon> -->
