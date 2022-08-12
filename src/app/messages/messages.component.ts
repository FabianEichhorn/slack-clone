import { Component, OnInit } from '@angular/core';
import { MessageService } from '../shared/message.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  data: any = this.messageService;
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

}
