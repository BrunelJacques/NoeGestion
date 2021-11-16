import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/general/message.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(
    public messageService: MessageService,
    public activeModal: NgbActiveModal    
  ) { }

  ngOnInit(): void {
  }

}
