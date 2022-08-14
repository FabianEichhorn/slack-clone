import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.class';
import { MessageService } from '../shared/message.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  user: User = new User;

  data: any = this.messageService;
  constructor(public messageService: MessageService, public firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.messageService.getFromFirebase();
    this.user.img.push('src/assets/img/user-32.png');
  }

}
