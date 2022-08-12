import { Component, OnInit } from '@angular/core';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {


  messageInput = "";
  data: any = this.messageService;


  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  sendMessage() {
    this.data.messages.push(this.messageInput);
    this.messageInput = "";
  }

}
