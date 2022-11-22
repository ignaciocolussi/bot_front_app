import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {KeyValue} from '@angular/common';
import { WebsocketChat } from './chat.component.model';
import { WebSocketService } from './websocket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebSocketService]
})
export class AppComponent implements OnInit {
  title = 'bot_front_app';

  constructor(
    public webSocket: WebSocketService
  ){ }

  sendmessage(wsMessageForm: NgForm) {
    const chatMsg = new WebsocketChat("user", wsMessageForm.value.message, []);
    this.webSocket.sendWebSocketMessage(chatMsg);
    wsMessageForm.controls['message'].reset();
}

  ngOnInit(): void {
    this.webSocket.openWebsocketConnection();
}
  ngOnDestroy(): void {
      this.webSocket.closeWebsocketConnection();
  }

  public keepOriginalOrder = (a:any, b:any) => a.key

}
