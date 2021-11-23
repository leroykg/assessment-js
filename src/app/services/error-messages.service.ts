import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessagesService {
  message: string = "";
  messageTimeout: any;

  //add new error message nd hide it after 5 seconds
  add(message: string) {
    this.message = message;

    clearTimeout(this.messageTimeout);
    this.messageTimeout = setTimeout(() => {
      this.message = "";
    }, 5000);
  }
}