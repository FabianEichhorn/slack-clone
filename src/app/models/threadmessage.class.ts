export class Threadmessage {
  text: string;
  timestamp: number;
  userId: string; // is the firebase document ID from the user who sent the message, for example user 3C651LYhk1HaB8Y0Vsbf
  channelMessageId: string; // is the firebase document ID from the channelMessage, in which thread  was posted, for example channel 5viuaTEwVJn1PWh9V5Ol

  constructor(obj?: any) {
    this.text = obj ? obj.text : '';
    this.timestamp = obj ? obj.timestamp : new Date().getTime();
    this.userId = obj ? obj.userId : '3C651LYhk1HaB8Y0Vsbf'
    this.channelMessageId = obj ? obj.channelMessageId : ''
  }

  public toJSON(): any {
    return {
      text: this.text,
      timestamp: this.timestamp,
      userId: this.userId,
      channelMessageId: this.channelMessageId
    }
  }
}
