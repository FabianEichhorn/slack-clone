import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { ChannelMessage } from '../models/channelmessage.class';
import { Directmessage } from '../models/directmessage.class';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  public routerUrl: string | null = this.router.url;

  channelmessage: ChannelMessage = new ChannelMessage();
  directmessage: Directmessage = new Directmessage();
  channelId: string | null = '';
  userId: string | null = '';
  public textArea: string = '';
  public isEmojiPickerVisible: any;




  constructor(public messageService: MessageService, public firestore: AngularFirestore, public route: ActivatedRoute, private router: Router) {
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      if (this.channelId) {
        this.channelmessage.channelId = this.channelId;
      }
    });


  }

  sendMessage() {
    this.routerUrl = this.channelId;
    this.channelmessage.timestamp = new Date().getTime();
    this.messageService.postToFirestore('channelMessages', this.channelmessage.toJSON());
    this.channelmessage.text = "";
    //this.routerUrl = this.channelId;
    //this.channelmessage.timestamp = new Date().getTime();
    //this.messageService.postToFirestore('directMessages', this.directmessage.toJSON());
    //this.channelmessage.text = "";

  }

  public addEmoji(event: any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  
}
