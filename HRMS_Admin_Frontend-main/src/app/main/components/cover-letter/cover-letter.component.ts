import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-cover-letter',
  templateUrl: './cover-letter.component.html',
  styleUrls: ['./cover-letter.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class CoverLetterComponent implements OnInit {


   public uploader: FileUploader = new FileUploader({
  
    isHTML5: true
  });
     public hasBaseDropZoneOver: boolean = false;

   //File Uploader Methods
  // -----------------------------------------------------------------------------------------------------
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
 /**
   * Constructor
   *
   * @param {NgbModal} modalService
   */
  constructor(private modalService: NgbModal) {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  // modal Basic
  modalOpen(modalBasic) {
    this.modalService.open(modalBasic, {
      windowClass: 'modal'
    });
  }

  // modal Open Vertically Centered
  modalOpenVC(modalVC) {
    this.modalService.open(modalVC, {
      centered: true
    });
  }

  // modal Open Backdrop Disabled
  modalOpenBD(modalBD) {
    this.modalService.open(modalBD, {
      backdrop: false,
      centered: true
    });
  }

  // modal Open Animation Disabled
  modalOpenAD(modalAD) {
    this.modalService.open(modalAD, {
      centered: true,
      windowClass: 'animation-disable',
      animation: false
    });
  }
  // modal Open Primary
  modalOpenPrimary(modalPrimary) {
    this.modalService.open(modalPrimary, {
      centered: true,
      windowClass: 'modal modal-primary'
    });
  }

  // modal Open Secondary
  modalOpenSecondary(modalSecondary) {
    this.modalService.open(modalSecondary, {
      centered: true,
      windowClass: 'modal modal-secondary'
    });
  }

  // modal Open Success
  modalOpenSuccess(modalSuccess) {
    this.modalService.open(modalSuccess, {
      centered: true,
      windowClass: 'modal modal-success'
    });
  }

  // modal Open Danger
  modalOpenDanger(modalDanger) {
    this.modalService.open(modalDanger, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
  }

  // modal Open Info
  modalOpenInfo(modalInfo) {
    this.modalService.open(modalInfo, {
      centered: true,
      windowClass: 'modal modal-info'
    });
  }

  // modal Open Warning
  modalOpenWarning(modalWarning) {
    this.modalService.open(modalWarning, {
      centered: true,
      windowClass: 'modal modal-warning'
    });
  }

  // modal Open Dark
  modalOpenDark(modalDark) {
    this.modalService.open(modalDark, {
      centered: true,
      windowClass: 'modal modal-dark'
    });
  }

  // modal Open Extra Small
  modalOpenXS(modalXS) {
    this.modalService.open(modalXS, {
      centered: true,
      size: 'xs'
    });
  }

  // modal Open Small
  modalOpenSM(modalSM) {
    this.modalService.open(modalSM, {
      centered: true,
      size: 'sm'
    });
  }

  // modal Open Default
  modalOpenDefault(modalDefault) {
    this.modalService.open(modalDefault, {
      centered: true
    });
  }

  // modal Open Large
  modalOpenLG(modalLG) {
    this.modalService.open(modalLG, {
      centered: true,
      size: 'lg'
    });
  }

  // modal Open Extra Large
  modalOpenXL(modalXL) {
    this.modalService.open(modalXL, {
      centered: true,
      size: 'xl'
    });
  }

  // modal Open On Show Event
  modalOpenOSE(modalOSE) {
    alert('onShow event fired!');
    this.modalService.open(modalOSE);
  }

  // modal Open After Show Event
  modalOpenBDE(modalBDE) {
    this.modalService.open(modalBDE, {
      beforeDismiss: () => {
        setTimeout(() => {
          alert('Event fired on dismiss of modal! Press Accept to close Model');
        }, 100);
        return false;
      }
    });
  }

  // modal Open Form
  modalOpenForm(modalForm) {
    this.modalService.open(modalForm , {
        centered: true,
        size:'lg'
    });
   
  }

  // modal Open Srolling Long Content
  modalOpenSLC(modalSLC) {
    this.modalService.open(modalSLC);
  }

  // modal Open Srolling Long Content Inside Modal
  modalOpenSLCIM(modalSLCIM) {
    this.modalService.open(modalSLCIM, { scrollable: true });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
  }
}
