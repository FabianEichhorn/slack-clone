import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChannelMessage } from '../models/channelmessage.class';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages: ChannelMessage[] = [];

  constructor(public firestore: AngularFirestore, public userService: UserService) { }


  ngOnInit(): void {
  }

  public getFromFirebase(messageType: string, id: string | null) {
    if (messageType == 'channelMessages') {
      this.getChannelMessageFromFirebase (id);
    } else if (messageType == 'directMessages') {
      this.getDirectMessageFromFirebase(id);
    }
  }

  private getChannelMessageFromFirebase(id : string | null) {
    this.firestore
      .collection("channelMessages", ref => ref.where('channelId', '==', id))
      .valueChanges()
      .subscribe((changes: any) => {
        this.messages = changes;
        this.messages.sort((a,b) => { return a.timestamp - b.timestamp});
        this.userService.getParticipants(this.messages);
      });
  }

  private getDirectMessageFromFirebase(id : string | null) {
    this.firestore
      .collection("directMessages", ref => ref
        .where('users', 'array-contains', '3C651LYhk1HaB8Y0Vsbf') // gives back all directMessages where current logged in user is part of
        )
      .valueChanges()
      .subscribe((changes: any) => {
        this.messages = changes.filter((item: { users: (string | null)[]; }) => item.users.includes(id));
        this.messages.sort((a,b) => { return a.timestamp - b.timestamp});
        this.userService.getParticipants(this.messages);
      });
  }

  public postToFirestore(collectionName: string, data:any) {
    this.firestore
      .collection(collectionName)
      .add(data);
  }

}









