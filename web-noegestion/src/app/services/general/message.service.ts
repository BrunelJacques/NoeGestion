import { Injectable } from '@angular/core';
import { MessagesComponent } from 'src/app/components/general/messages/messages.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.unshift(message);
  }

  clear() {
    this.messages = [];
  }
}