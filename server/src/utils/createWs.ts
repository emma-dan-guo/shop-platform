import * as ws from 'ws'
import { exec } from 'child_process'

const mockCreateOrder = () => {
  exec(
    `
  curl 'http://localhost:8000/api/v1/data/update/order' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: en-US,en;q=0.9,zh;q=0.8,zh-CN;q=0.7' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json; charset=UTF-8' \
  -H 'Origin: http://localhost:3000' \
  -H 'Referer: http://localhost:3000/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  --data-raw '{"duration":[1712557179781,1712902779781],"category":[1],"location":[1000]}' \
  --compressed
  `,
    (_, stdout) => {
      console.log('==stdout', stdout)
    }
  )
}

class WsServer {
  socketForServer: any = null

  send(message: string) {
    this.socketForServer?.send(message)
  }

  create() {
    const webSocketServer = new ws.Server({
      port: 30002
    })
    webSocketServer.on('listening', (socket: ws) => {
      console.log('web socket begins listening')
    })

    webSocketServer.on('connection', (socket: ws) => {
      this.socketForServer = socket
      socket.on('close', (code, reason) => {
        console.log(`the websocket is closed, code: ${code}, reason: ${reason}`)
      })

      socket.on('error', (error: Error) => {
        console.log('==error', error)
      })

      socket.on('message', (event) => {
        console.log('receive Data', event.toString())
        if (event.toString() === 'client_ready') {
          for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
            mockCreateOrder()
          }
          setTimeout(() => {
            socket.send('refresh')
          }, 5000)
        }
      })

      socket.send('server_ready')
    })
  }
}

export const DataWebSocket = new WsServer()
