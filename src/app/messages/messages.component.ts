import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../shared/message.service';
import { UserService } from '../shared/user.service';



@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  channelId : string | null = '';

  constructor(public messageService: MessageService, private route: ActivatedRoute, public userService: UserService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      this.messageService.getFromFirebase(this.channelId);
    });
  }

}
