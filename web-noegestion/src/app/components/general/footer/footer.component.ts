import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessagesComponent } from '../messages/messages.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }
  appName = environment.appName
  appVersion = environment.appVersion
  appYear = environment.appYear
  ngOnInit() {
  }
  onlog() {
    const modalRef = this.modalService.open(MessagesComponent);
  }


}
