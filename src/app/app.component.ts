import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

import { Thread } from './domain/thread';

import { MessageActions } from './actions/message.actions';
import { ThreadActions } from './actions/thread.actions';

import { AppDispatcher } from './state/app.dispatcher';
import { AppStore } from './state/app.store';
import { MessageStore } from './state/message.store';
import { ThreadStore } from './state/thread.store';
import {MessageVM} from './ui/message.vm';
import {ThreadVM} from './ui/thread.vm';
import { init } from '../assets/data/chat-example-data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  private messages: MessageVM[];
  private thread: ThreadVM;
  private threadId: string;
  private threads: ThreadVM[];
  private message: string;

  constructor(private dispatcher: AppDispatcher,
              private appStore: AppStore,
              private messageActions: MessageActions,
              private messageStore: MessageStore,
              private threadActions: ThreadActions,
              private threadStore: ThreadStore) {
                init();
    this.appStore.observable.subscribe((state) => {
      console.log(state);
    });
    this.messageStore.getAllForCurrentThread().subscribe((s) => this.messages = s);
    this.threadStore .getCurrent()            .subscribe((s) => this.thread = s);
    this.threadStore .getId()                 .subscribe((s) => this.threadId = s);
    this.threadStore .getAllChrono()          .subscribe((s) => this.threads = s);
  }

  ngOnInit() {
    this.dispatcher.emitAll([
      this.messageActions.getAllMessages(),
      this.threadActions.getAllThreads(),
    ]);
  }

  onClickThread(thread: Thread) {
    this.dispatcher.emit(this.threadActions.clickThread(thread.id));
  }

  onKeydown(event: KeyboardEvent) {
    if (event.keyCode === 13 /* ENTER */) {
      event.preventDefault();
      const text = this.message.trim();
      if (text) {
        this.dispatcher.emit(this.messageActions.createMessage(text));
      }
      this.message = '';
    }
  }
}
