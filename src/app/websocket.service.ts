import {WebsocketChat } from './chat.component.model';
import {Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService{
  websocket!: WebSocket;
  websocketMessage: WebsocketChat [] = [];
  status: boolean = false;
  constructor() {}

  openWebsocketConnection() {
    try{
      this.websocket = new WebSocket('wss://botpruebatecnica.e2ecfsbwc5h7d2fh.eastus.azurecontainer.io:3000');
    }catch(err){
      console.log(err)
      try{
        this.websocket = new WebSocket('wss://botpruebatecnica.e2ecfsbwc5h7d2fh.eastus.azurecontainer.io:3000');
      }catch(err){
        console.log(err)
      }

    }


    this.websocket.onopen = (e) => {
      this.status = true;
     }

     this.websocket.onmessage = (e) => {
      console.log(e);
      const msg = JSON.parse(e.data);
      const chatMsg = {"user": 'bot', "message":msg.data, "object":msg.object}
      this.websocketMessage.push(chatMsg);
      console.debug(chatMsg);
     }


    this.websocket.onclose = (e) => {
      this.status = false;
    }
  }

  sendWebSocketMessage(chatMsg: WebsocketChat){
    this.websocket.send(JSON.stringify(chatMsg));
    //const chatMsg = {"user": 'bot', "message":e.data}
    this.websocketMessage.push(chatMsg);
  }

  closeWebsocketConnection() {
     this.websocket.close();
  }
}
