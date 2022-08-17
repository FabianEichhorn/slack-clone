import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.class';
import { MessageService } from '../shared/message.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  user: User = new User;
  channelId : string | null = '';

  data: any = this.messageService;
  constructor(public messageService: MessageService, public firestore: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      this.messageService.getFromFirebase(this.channelId);
    });
  }

  getUser() {
    this.firestore
      .collection('users')
      .doc('0ktdB0VydBMemqEwcDIv') // the ID from user that we would get
      .valueChanges( {idField: 'customIdName'} )
      .pipe(first())
      .subscribe((user: any)=>{
        console.log(user);
        // this.user = new User(user);
      });
  }

}
