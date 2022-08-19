import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Channel } from '../models/channel.class';
import { User } from '../models/user.class';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  channels: Channel[] = [];
  users: User[] = [];

  constructor(public firestore: AngularFirestore, public router: Router) { }

  ngOnInit(): void {
    this.getChannels();
    this.getUsers();
  }

  private getChannels() {
    this.firestore
      .collection("channels", ref => ref.where("users", "array-contains", "3C651LYhk1HaB8Y0Vsbf")) // query all channels where current user is part of
      .valueChanges( {idField: 'customIdName'} )
      .subscribe((changes: any) => {
        this.channels = changes;
      });
  }

  private getUsers() {
    this.firestore
      .collection("users")
      .valueChanges( {idField: 'customIdName'} )
      .subscribe((changes: any) => {
        this.users = changes;
      });
  }

  public openDialogAddChannel() {
    // todo: implement add channel Logik und Dialog
    alert('add channel noch zu implementieren.');
  }
}
