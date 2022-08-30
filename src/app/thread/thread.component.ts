import { Component } from '@angular/core';
import { MessageService } from '../shared/message.service';
import { ThreadService } from '../shared/thread.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent {

  constructor(public messageService: MessageService, public userService: UserService, public threadService: ThreadService) { }

}
