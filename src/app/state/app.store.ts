import { Injectable } from '@angular/core';
import { State, Store } from 'walts';

import { Thread } from '../domain/thread';
import { AppDispatcher } from './app.dispatcher';
import { AppState } from './app.state';

const INIT_STATE: AppState = {
  threadId: '',
  threads: [],
  messages: []
};

@Injectable()
export class AppStore extends Store<AppState> {

  constructor(protected dispatcher: AppDispatcher) {
    super(INIT_STATE, dispatcher);
  }

}
