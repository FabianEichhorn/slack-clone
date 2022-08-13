import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MessageService } from '../shared/message.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  data: any = this.messageService;
  constructor(public messageService: MessageService, public firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.messageService.getFromFirebase();
  }

}
