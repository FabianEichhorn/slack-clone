import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { ThreadComponent } from './thread/thread.component';

const routes: Routes = [
  // { path: 'messages/:id1', component: MessagesComponent },
  { path: 'thread', component: ThreadComponent },
  { path: 'channelmessages', component: MessagesComponent },
  { path: 'privatemessages', component: MessagesComponent },
  { path: 'login', component: LoginComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
