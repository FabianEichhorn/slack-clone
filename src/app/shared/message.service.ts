import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages = [];

  ngOnInit(): void {
    this.messages = this.getMessages();
  }

  constructor() { }


  // Empty array for messages
  public getMessages() {
    return [];

  }


}
