import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppDispatcher } from './state/app.dispatcher';
import { AppStore } from './state/app.store';
import { actions } from './actions/index';
import { ThreadStore } from './state/thread.store';
import { MessageStore } from './state/message.store';
import {MessageRepository} from './domain/message.repository';
import {ThreadRepository} from './domain/thread.repository';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    actions,
    AppDispatcher,
    AppStore,
    ThreadStore,
    MessageStore,
    MessageRepository,
    ThreadRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
