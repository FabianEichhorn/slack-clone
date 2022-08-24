import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  isThreadOpened: boolean = false;
  threadForMessageId: string = ''; // says, tho which message id belongs the thread

  constructor(private messageService: MessageService) { }

  public openThread(customIdName: string) {
    this.isThreadOpened = true;
    this.threadForMessageId = customIdName;
    this.getThread(customIdName);
  }

  public getThread(customIdName: string) {
    this.messageService.getThread(customIdName);
  }

  public closeThread() {
    this.isThreadOpened = false;
    this.threadForMessageId = '';
  }
}
