import { useEffect, useRef, useState } from 'react'
import { DataProbeWebsocket } from 'utils/websocket'

export const useDataWebSocket = (callback: (...args: any) => any) => {
  const [isRefreshOpen, setRefreshOpen] = useState(false)
  const ws = useRef<any>()
  const refreshCountRef = useRef(0)

  const mockRefresh = () => {
    refreshCountRef.current = refreshCountRef.current + 1
    if (refreshCountRef.current <= 3) {
      // if server receive the message, it will send "refresh" in 5 second;
      ws.current.send('client_ready')
    } else {
      ws.current.close()
    }
  }

  useEffect(() => {
    if (isRefreshOpen) {
      ws.current = new DataProbeWebsocket()
      ws.current.onMessage((message) => {
        if (message === 'server_ready' || message === 'refresh') {
          callback()
        }
      })
      ws.current.create()
    } else {
      ws.current?.close()
      refreshCountRef.current = 0
    }
  }, [isRefreshOpen])
  return {
    isRefreshOpen,
    setRefreshOpen
  }
}
