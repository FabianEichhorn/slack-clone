export class Directmessage {
  text: string;
  timestamp: number;
  senderUserId: string; // is the firebase document ID from the user who sent the message, for example user 3C651LYhk1HaB8Y0Vsbf
  receiverUserId: string;

  constructor(obj?: any) {
    this.text = obj ? obj.text : '';
    this.timestamp = obj ? obj.timestamp : new Date().getTime();
    this.senderUserId = obj ? obj.senderUserId : '3C651LYhk1HaB8Y0Vsbf'
    this.receiverUserId = obj ? obj.receiverUserId : ''
  }

  public toJSON(): any {
    return {
      text: this.text,
      timestamp: this.timestamp,
      senderUserId: this.senderUserId,
      receiverUserId: this.receiverUserId,
    }
  }
}
