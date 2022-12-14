import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { ImprintComponent } from './imprint/imprint.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { ThreadComponent } from './thread/thread.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: LoginComponent
  },
  {
    path: 'thread', component: ThreadComponent
  },
  {
    path: 'imprint', component: ImprintComponent
  },
  {
    path: 'data-protection', component: DataProtectionComponent
  },
  {
    path: 'channelmessages', component: MessagesComponent,
    data: { messageType: "channelmMessages" }
  },
  {
    path: 'channelmessages/:id', component: MessagesComponent,
    data: { messageType: "channelMessages" },
    children: [
      {
        path: 'threads',
        component: MessagesComponent, // muss evtl. noch angepasst werden
      }
    ]
  },
  {
    path: 'directmessages', component: MessagesComponent,
    data: { messageType: "directMessages" }
  },
  {
    path: 'directmessages/:id', component: MessagesComponent,
    data: { messageType: "directMessages" }
  },

  {
    path: '**', redirectTo: '/' // falls was falsches eingegeben wird, wird man immer wieder zur startseite geleitet
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
