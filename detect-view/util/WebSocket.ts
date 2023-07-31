
const ws :WebSocket = new WebSocket("ws://localhost:7851")

export function send(obj : Map<string,boolean>){
    ws.send(JSON.stringify(Object.fromEntries(obj)));
}