import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages = [];

  ngOnInit(): void {
    this.messages = this.getMessages();

  }

  constructor(public firestore: AngularFirestore) { }


  // Empty array for messages
  public getMessages() {
    return [];
  }



}
