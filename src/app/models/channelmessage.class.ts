import { objectVal } from "@angular/fire/database";

export class ChannelMessage {
  text: string;
  timestamp: number;
  userId: string; // is the firebase document ID from the user who sent the message, for example user 3C651LYhk1HaB8Y0Vsbf
  channelId: string; // is the firebase document ID from the channel, in which message was posted, for example channel 8liMczKcm1Paer7sJbAX
  customIdName: string;
  public textStyle: "normal" | "italic" | "bold" | "linethrough" = 'normal';

  constructor(obj?: any) {
    this.text = obj ? obj.text : '';
    this.timestamp = obj ? obj.timestamp : new Date().getTime();
    this.userId = obj ? obj.userId : '3C651LYhk1HaB8Y0Vsbf'
    this.channelId = obj ? obj.channelId : ''
    this.customIdName = obj ? obj.customIdName : '';
    this.textStyle = obj ? obj.textStyle : '';
  }

  public toJSON(): any {
    return {
      text: this.text,
      timestamp: this.timestamp,
      userId: this.userId,
      channelId: this.channelId,
      customIdName: this.customIdName,
      textStyle: this.textStyle,
    }
  }
}
