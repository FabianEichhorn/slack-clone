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
      this.messageService.send(this.imageFile, this.message, this.routerUrl, this.postInThreadOfMessage);
      this.imageFile = null;
    } else {
      this.openSnackBar('Please insert a text or an image.', 'close');
    }
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
    if (this.loginService.guestLogin || this.loginService.login) {
      this.message.userId = this.loginService.userId;
    }
  }
}
