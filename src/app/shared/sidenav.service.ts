import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Channel } from '../models/channel.class';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public channels: Channel[] = [];
  public users: User[] = [];

  constructor(public firestore: AngularFirestore) { }

  public toggle(): void {
    return this.sideNavToggleSubject.next(null);
  }

  public getChannels() {
    this.firestore
      .collection("channels", ref => ref.where("users", "array-contains", "3C651LYhk1HaB8Y0Vsbf")) // query all channels where current user is part of
      .valueChanges( {idField: 'customIdName'} )
      .subscribe((changes: any) => {
        this.channels = changes;
      });
  }

  public getUsers() {
    this.firestore
      .collection("users")
      .valueChanges( {idField: 'customIdName'} )
      .subscribe((changes: any) => {
        this.users = changes;
      });
  }

  public addChannel(channelName: string) {
    this.firestore
      .collection('channels')
      .add({
        'name': channelName,
        'users': ['0ktdB0VydBMemqEwcDIv', '3C651LYhk1HaB8Y0Vsbf', '8dbx47l03bPocYuOfuJ4'],
      })
  }
}
