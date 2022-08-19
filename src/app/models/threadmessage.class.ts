export class Threadmessage {
  text: string;
  timestamp: number;
  userId: string; // is the firebase document ID from the user who sent the message, for example user 3C651LYhk1HaB8Y0Vsbf


  constructor(obj?: any) {
    this.text = obj ? obj.text : '';
    this.timestamp = obj ? obj.timestamp : new Date().getTime();
    this.userId = obj ? obj.userId : '3C651LYhk1HaB8Y0Vsbf'
  }

  public toJSON(): any {
    return {
      text: this.text,
      timestamp: this.timestamp,
      userId: this.userId,
    }
  }
}
