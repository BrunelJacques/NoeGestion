import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component'; 
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-stsortie',
  templateUrl: './stsortie.component.html',
  styleUrls: ['./stsortie.component.scss']
})
export class StsortieComponent implements OnInit {

  modalRef: MdbModalRef<ModalComponent> | undefined;

  constructor(
    private modalService: MdbModalService,
  ) {
  } openModal() {
    this.modalRef = this.modalService.open(ModalComponent, { data: { title: 'Custom title' }
    });
  }

  ngOnInit(): void {
  }
}
