
export class WebsocketChat{
  user: string;
  message: string;
  object: Array<string>;

  constructor(user: string, message: any, object: Array<string>) {
      this.user = user;
      this.message = message;
      this.object = object;
  }
}
