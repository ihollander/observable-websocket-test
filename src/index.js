import { Observable } from "rxjs";

// "ws://localhost:3000/cable"
const ws = uri => {
  return new Observable(subscribe => {
    const socket = new WebSocket(uri);

    // handler

    // Connection opened
    socket.addEventListener("open", function(event) {
      // connect to Messages channel
      const message = {
        command: "subscribe",
        identifier: {
          channel: "Messages"
        }
      };

      socket.send(JSON.stringify(message));
    });

    // Listen for messages
    socket.addEventListener("message", function(event) {
      console.log("Message from server ", event.data);
    });
  });
};
