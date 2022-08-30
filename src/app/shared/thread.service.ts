import { Injectable, Input } from '@angular/core';
import { Message } from '../models/message.class';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  isThreadOpened: boolean = false;
  threadForMessageId: string = ''; // says, tho which message id belongs the thread
  parentMessage: Message;

  constructor(private messageService: MessageService) { }

  public openThread(message: Message) {
    this.parentMessage = message;
    this.isThreadOpened = true;
    this.threadForMessageId = message.customIdName;
    this.messageService.getThread(message.customIdName);
  }

  public closeThread() {
    this.isThreadOpened = false;
    this.threadForMessageId = '';
  }
}
