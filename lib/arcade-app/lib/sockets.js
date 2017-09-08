'use strict';

/*
 * WebSockets rely on an evelope pattern being transmitted.
 * The client socket interface must send data in the following format:
 *
 * { type: <String>, payload: <Objext> }
 *
 * Bus messages must be sent with the a `type` of 'bus' and `data` in the
 * following format:
 *
 * { name: <String>, data: <Any> }
 */
module.exports = function sockets() {
  const WebSocket = require('ws');
  const wss = new WebSocket.Server({ port: this.options.wssPort });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      let envelope;

      try {
        envelope = JSON.parse(message);
      } catch (e) {
        envelope = {};
      }

      if (envelope.type && envelope.type === 'bus') {
        const { payload } = envelope;
        this.bus.emit(payload.name, payload.data);
      }
    });

    ws.send(JSON.stringify({ type: 'bus', data: 'connected' }));
  });

  this.wss = wss;
};
