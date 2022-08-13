import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChannelMessage } from '../models/channelmessage.class';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  channelmessage: ChannelMessage = new ChannelMessage();

  constructor(private messageService: MessageService, public firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  sendMessage() {
    this.channelmessage.timestamp = new Date();
    this.messageService.postToFirestore('channelMessages', this.channelmessage.toJSON());
    this.channelmessage.text = "";
  }

}
