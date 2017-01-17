import Server from 'socket.io';


// this code creates a socket.io server as well as a regular HTTP server
// bound to the port 8090.  
export default function startServer() {
  const io = new Server().attach(8090);

  // we are subscribing a listener to the store that reads 
  // the current state and turns it into a plain JS obj.  
  // and emits it as a state event on that Socket.io server.

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  )
  // listens on the connection event on our Socket.io server.  
  // emits the current state right away.
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store))
  })
}
