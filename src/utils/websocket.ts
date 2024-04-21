export class DataProbeWebsocket {
  private localUrl = 'ws://localhost:30002'
  private remoteUrl = 'ws://goodapp.ca/ws'
  private url = `${process.env.NODE_ENV === 'development' ? this.localUrl : this.remoteUrl}`
  public ws: WebSocket | null = null
  private messageCbs: any = []

  create() {
    this.ws = new WebSocket(this.url)
    this.ws.binaryType = 'arraybuffer'
    this.ws.onerror = (err) => {
      console.log('===err', err)
    }
    this.ws.onmessage = (event) => {
      console.log('===收到的信息', event.data)
      this.messageCbs.map((cb) => cb(event.data))
    }
  }

  send(message) {
    this.ws?.send(message)
  }

  onMessage(messageCb: (message: string) => void) {
    this.messageCbs.push(messageCb)
  }

  // close websocket
  close() {
    this.ws?.close()
    this.ws = null
  }
}

export type DataProbeWebsocketType = typeof DataProbeWebsocket
