import wsAdapter from "./wsAdapter";
import LineChart from "./chart";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  const coords = [[25, 25], [50, 50], [715, 75]];

  const chart = new LineChart(ctx, { color: "orange", data: [coords] });
  chart.draw();

  const adapter = wsAdapter("ws://localhost:3210");

  adapter.stream.subscribe(data => {
    console.log(data);

    // sample first 5 trains
    const first5 = data.slice(0, 5);

    // get unique list of stops
    const stopsObj = first5.reduce((obj, cur) => {
      cur.stops.forEach(stop => {
        if (!obj[stop.stopId]) {
          obj[stop.stopId] = true;
        }
      });
      return obj;
    }, {});
    const stopsArr = Object.keys(stopsObj).sort();
    console.log(stopsArr);

    // 
  });
});

// const socket = new WebSocket(uri);

// // Connection opened
// socket.addEventListener("open", function(event) {
//   const message = "Ping";
//   console.log(`%cOpening connection message: ${message}`, "color: green");
//   socket.send(message);
// });

// // Listen for messages
// socket.addEventListener("message", function(event) {
//   console.log(`%cMessage from server: ${event.data}`, "color: red");
// });

// // Close connection
// socket.addEventListener("close", function(event) {
//   console.warn("Connection closed", event);
// });

// // Error handling
// socket.addEventListener("error", function(event) {
//   console.error("Connection error", event);
// });

// const sendMessage = message => {
//   console.log(`%cMessage to server: ${message}`, "color: green");
//   socket.send(message);
// };

// window.sendMessage = sendMessage;
