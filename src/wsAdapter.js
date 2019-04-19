import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

const socketStream = function(socket) {
  return new Observable(subscriber => {
    // push message for open
    const openHandler = () => {
      console.log("Socket connected:", socket);
    };

    // push messages
    const messageHandler = event => subscriber.next(event);

    // end stream
    const closeHandler = () => {
      console.warn("Socket closed");
      subscriber.complete();
    };

    const errorHandler = err => {
      console.error(err);
      subscriber.error(err);
    };

    // socket events
    socket.addEventListener("open", openHandler);

    socket.addEventListener("message", messageHandler);

    socket.addEventListener("close", closeHandler);

    socket.addEventListener("error", errorHandler);

    // allow us to close connection on unsubscribe
    return () => socket.close();
  });
};

export default uri => {
  // create new websocket instance
  const socket = new WebSocket(uri);

  // turn it into an observable
  const stream = socketStream(socket);

  // map it!
  const dataStream = stream.pipe(map(event => JSON.parse(event.data)));

  // access to sending data
  const send = message => {
    console.log(`%cMessage to server: ${message}`, "color: green");
    socket.send(message);
  };

  return {
    send,
    stream: dataStream
  };
};
