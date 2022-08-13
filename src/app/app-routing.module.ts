import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  // { path: 'messages/:id1', component: MessagesComponent },
  // { path: 'messages/:id2', component: MessagesComponent },
  //{ path: 'messages/:id3', component: MessagesComponent },
  //{ path: 'messages/:id4', component: MessagesComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
