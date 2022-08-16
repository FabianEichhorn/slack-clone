import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { ChannelMessage } from '../models/channelmessage.class';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages: ChannelMessage[] = [];

  constructor(public firestore: AngularFirestore) { }


  ngOnInit(): void {

  }

  public getFromFirebase(channelId : string | null) {
    this.firestore
      .collection("channelMessages", ref => ref.where('channelId', '==', channelId))
      .valueChanges()
      .subscribe((changes: any) => {
        this.messages = changes;
        this.messages.sort((a,b) => { return a.timestamp - b.timestamp})
      });
  }

  public postToFirestore(collectionName: string, data:any) {
    this.firestore
      .collection(collectionName)
      .add(data);
  }


}









