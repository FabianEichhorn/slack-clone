import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Message } from '../models/message.class';
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
  public message: Message = new Message();
  public channelId: string | null = '';
  public userId: string | null = '';
  public textArea: string = '';
  public isEmojiPickerVisible: any;
  public fileName: string = '';
  private imageFile: File = null;
  public findUserId: any;


  constructor(
    public messageService: MessageService,
    public route: ActivatedRoute,
    private router: Router,
    public loginService: LoginService,
    public user: UserService,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      if (this.channelId) {
        this.message.channelId = this.channelId;
      }
    });
  }

  public trySendMessage() {
    if (this.message.text != '' || this.imageFile) {
      // this.channelId = this.routerUrl;
      this.getRightUserId();
      this.message.textStyle = this.messageService.selectedButton;
      this.message.timestamp = new Date().getTime();
      this.sendMessageAndImage();
      this.imageFile = null;
    } else {
      this.openSnackBar('Please insert a text or an image.', 'close');
    }
  }

  private sendMessageAndImage() {
    this.messageService.post(this.imageFile, this.message, this.routerUrl, this.postInThreadOfMessage);
  }

  public addEmoji(event: any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { "duration": 2000 });
  }

  public onFileSelected(event) {
    this.imageFile = event.target.files[0]; // in the event we can find out the filename of selectedImage
    this.fileName = this.imageFile.name;
  }

  private getRightUserId() {
    if (this.loginService.questLogin) {
      this.message.userId = 'GfjNnUqEpNxZxTyBdCwt';
    } else if (this.loginService.login && this.loginService.loginEmail == 'dumbminds@gmx.de') {
      this.message.userId = '3C651LYhk1HaB8Y0Vsbf'
    } else if (this.loginService.login && this.loginService.loginEmail == 'fabihorn.go@gmail.com') {
      this.message.userId = '0ktdB0VydBMemqEwcDIv'
    } else if (this.loginService.login && this.loginService.loginEmail == 'klammer.lukas@hotmail.com') {
      this.message.userId = '8dbx47l03bPocYuOfuJ4'
    }
  }
}
