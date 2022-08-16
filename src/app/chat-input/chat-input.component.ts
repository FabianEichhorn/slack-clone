import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ChannelMessage } from '../models/channelmessage.class';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  channelmessage: ChannelMessage = new ChannelMessage();
  channelId: string | null = '';
  public textArea: string = '';
  public isEmojiPickerVisible: any;


  constructor(private messageService: MessageService, public firestore: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      if (this.channelId) {
        this.channelmessage.channelId = this.channelId;
      }
    });
  }

  sendMessage() {
    this.channelmessage.timestamp = new Date().getTime();
    this.messageService.postToFirestore('channelMessages', this.channelmessage.toJSON());
    this.channelmessage.text = "";
  }

  public addEmoji(event: any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

}
