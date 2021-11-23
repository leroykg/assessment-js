import { Component, OnInit } from '@angular/core';
import { ErrorMessagesService } from '../../services/error-messages.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  constructor(public errorMessagesService: ErrorMessagesService) { }

  ngOnInit(): void {
  }

}