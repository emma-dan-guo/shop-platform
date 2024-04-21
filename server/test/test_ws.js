/// just a demo
const ws = new WebSocket("ws://localhost:8000/dataProbe");
ws.onmessage = function(e) {e.data === 'f' || e.data === 't'}
ws.send('abcd')
