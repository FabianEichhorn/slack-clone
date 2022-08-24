import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ChannelMessage } from '../models/channelmessage.class';
import { LoginService } from '../shared/login.service';
import { MessageService } from '../shared/message.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  @Input() postInThreadOfMessage: string = ''; // if we set this ID, a message will be posted as child of a channelmessage, if not it will be a normal message
  public routerUrl: string | null = this.router.url;
  public channelmessage: ChannelMessage = new ChannelMessage();
  public channelId: string | null = '';
  public userId: string | null = '';
  public textArea: string = '';
  public isEmojiPickerVisible: any;
  public fileName: string = '';
  public findUserId: any;


  constructor(
    public messageService: MessageService,
    public firestore: AngularFirestore,
    public route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage,
    public loginService: LoginService,
    public user: UserService,
    private _snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      if (this.channelId) {
        this.channelmessage.channelId = this.channelId;
      }
    });
  }

  sendMessage() {
    if (this.channelmessage.text != '') {
      if (this.routerUrl.includes('channelmessages')) {
        this.sendChannelMessage();
      } else if (this.routerUrl.includes('directmessages')) {
        this.sendDirectMessage();
      }
    } else {
      this.openSnackBar('Please insert a text.', 'close');
    }
  }

  public addEmoji(event: any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  private sendChannelMessage() {
    this.channelId = this.routerUrl;
    this.getRightUserId()
    this.channelmessage.textStyle = this.messageService.selectedButton;
    this.channelmessage.timestamp = new Date().getTime();
    if (this.postInThreadOfMessage != '') {
      this.messageService.postThreadToFirestore('channelMessages', this.postInThreadOfMessage, this.channelmessage.toJSON());
    } else {
      this.messageService.postToFirestore('channelMessages', this.channelmessage.toJSON());
    }
    this.channelmessage.text = "";
  }

  private sendDirectMessage() {
    this.channelId = this.routerUrl;
    this.getRightUserId()
    this.channelmessage.textStyle = this.messageService.selectedButton;
    this.channelmessage.timestamp = new Date().getTime();
    this.messageService.postToFirestore('directMessages', this.channelmessage.toJSON());
    this.channelmessage.text = "";
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {"duration": 2000});
  }

  onFileSelected(event) {
    const file: File = event.target.files[0]; // in the event we can find out the filename of selectedImage
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
  getRightUserId() {
    if (this.loginService.questLogin) {
      this.channelmessage.userId = 'GfjNnUqEpNxZxTyBdCwt';
    } else if (this.loginService.login && this.loginService.loginEmail == 'dumbminds@gmx.de') {
      this.channelmessage.userId = '3C651LYhk1HaB8Y0Vsbf'
    } else if (this.loginService.login && this.loginService.loginEmail == 'fabihorn.go@gmail.com') {
      this.channelmessage.userId = '0ktdB0VydBMemqEwcDIv'
    } else if (this.loginService.login && this.loginService.loginEmail == 'klammer.lukas@hotmail.com') {
      this.channelmessage.userId = '8dbx47l03bPocYuOfuJ4'
    }
  }
}
