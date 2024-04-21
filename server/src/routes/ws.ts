import WebSocket from 'ws'
import { hasNewOrder } from '../service/business'
import { WsEvent } from '../utils/ws'

// Probe then determine if we need to update charts
const dataProbeEvent: WsEvent = {
  path: '/dataProbe',
  onConnection: (ws) => {
    console.log('===ws', ws)
  },
  onMessage: async (wss, ws, m) => {
    // Now, we can ignore the content of message, because
    // we have no other signal protocol
    hasNewOrder().then((result) => {
      if (result) {
        // Broadcast the message to all connected clients
        wss.clients.forEach((client: any) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send('t')
          }
        })
      } else {
        ws.send('f')
      }
    })
  },
  onClose: () => {
    console.log('===close')
  }
}

// Define events you wanna expose
export const exposedWsEvents: WsEvent[] = [dataProbeEvent]
