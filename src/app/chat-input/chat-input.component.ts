import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ChannelMessage } from '../models/channelmessage.class';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  public routerUrl: string | null = this.router.url;
  public channelmessage: ChannelMessage = new ChannelMessage();
  public channelId: string | null = '';
  public userId: string | null = '';
  public textArea: string = '';
  public isEmojiPickerVisible: any;
  public fileName: string = '';

  constructor(
    public messageService: MessageService,
    public firestore: AngularFirestore,
    public route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage,
    ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      if (this.channelId) {
        this.channelmessage.channelId = this.channelId;
      }
    });
  }

  sendMessage() {
    if (this.routerUrl.includes('channelmessages')) {
      this.sendChannelMessage();
    } else if (this.routerUrl.includes('directmessages')) {
      this.sendDirectMessage();
    }
  }

  public addEmoji(event: any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  sendChannelMessage() {
    this.channelId = this.routerUrl;
    this.channelmessage.timestamp = new Date().getTime();
    this.messageService.postToFirestore('channelMessages', this.channelmessage.toJSON());
    this.channelmessage.text = "";
  }

  sendDirectMessage() {
    this.channelId = this.routerUrl;
    this.channelmessage.timestamp = new Date().getTime();
    this.messageService.postToFirestore('directMessages', this.channelmessage.toJSON());
    this.channelmessage.text = "";
  }

  onFileSelected(event) {
    const file:File = event.target.files[0]; // in the event we can find out the filename of selectedImage

    if (file) {
      this.fileName = file.name;

      console.log('Firebase Upload: file:', file, ' name: ', this.fileName);

      // this.saveToFireStorage();
    }
  }

  saveToFireStorage() {
    this.storage
    .upload('testimage', 'image.image')
  }


}
