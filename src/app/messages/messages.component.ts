import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../shared/message.service';
import { ThreadService } from '../shared/thread.service';
import { UserService } from '../shared/user.service';



@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  id : string | null = '';
  url : string = '';
  messageType: string = '';
  selectedStyle: 'bold' | 'italic'

  constructor(public messageService: MessageService, private route: ActivatedRoute, public userService: UserService, public threadService: ThreadService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.messageType = data['messageType'];
    });

    this.route.paramMap.subscribe(paramMap => {
      this.threadService.closeThread();
      this.id = paramMap.get('id');
      this.messageService.getFromFirebase(this.messageType, this.id);
    });
  }

}
