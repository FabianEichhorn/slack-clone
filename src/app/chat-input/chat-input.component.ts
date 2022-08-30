import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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
  public channelId: string | null = '';
  public userId: string | null = '';
  public isEmojiPickerVisible: any;
  public messageText: string = '';
  public imageFile: File | null = null;


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
        this.messageService.message.channelId = this.channelId;
      }
    });
  }

  public trySendMessage() {
    if (this.messageService.isUploading) {
      this.openSnackBar('Please wait until upload is completed.', 'close');
    }
    else if (this.messageText != '' || this.messageService.imageFile != null) {
      this.sendMessage();
    } else {
      this.openSnackBar('Please insert a text or an image.', 'close');
    }
  }

  private sendMessage() {
    this.getRightUserId();
    this.messageService.message.text = this.messageText;
    this.messageService.imageFile = this.imageFile;
    this.messageService.message.channelId = this.channelId;
    this.messageService.message.textStyle = this.messageService.selectedButton;
    this.messageService.message.timestamp = new Date().getTime();
    this.messageService.post(this.routerUrl, this.postInThreadOfMessage);
    this.resetInputs();
  }

  private resetInputs() {
    this.messageText = '';
    this.imageFile = null;
  }

  public addEmoji(event: any) {
    this.messageText = `${this.messageText}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { "duration": 2000 });
  }

  public onFileSelected(event) {
    this.imageFile = event.target.files[0]; // in the event we can find out the filename of selectedImage
  }

  private getRightUserId() {
    if (this.loginService.guestLogin || this.loginService.login) {
      this.messageService.message.userId = this.loginService.userId;
    }
  }
}
