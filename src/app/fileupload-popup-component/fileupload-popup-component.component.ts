import { Component, OnInit,Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeServiceService } from '../services/employee-service.service';

@Component({
  selector: 'app-fileupload-popup-component',
  templateUrl: './fileupload-popup-component.component.html',
  styleUrls: ['./fileupload-popup-component.component.css']
})
export class FileuploadPopupComponentComponent implements OnInit {
  @Input() employeeid?: any;
  buttonDisable: boolean = true;
  uploadDetails : any;
  constructor(
    private employeeService: EmployeeServiceService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) { }


  ngOnInit(): void {
  }

  onFileChange(ev : any) {
    
   
    this.buttonDisable = true;
   

    const validFileExtensions = ['jpg', 'jpeg', 'bmp', 'gif', 'png'];
        const type = ev.target.files[0].name.split('.')[1];
     
        if (validFileExtensions.includes(type.toLowerCase())) {
         
          this.buttonDisable = false;
          this.uploadDetails = {
            fileToUpload: ev.target.files[0],
            fileName: ev.target.files[0].name,
          };
        } else {
         
          this.buttonDisable = true;
          ev.target.value = null;
        }
  }
  onConfirm() {
   
  
      // this.CommonService.filecount(this.filescount);
      // // setTimeout(() => {
      // this.saveTemplate.emit(this.uploadDetails);
      this.employeeService
      .uploadDocument(this.uploadDetails.fileToUpload, this.employeeid)
      .subscribe((resp) => {
        this.activeModal.close();
      });
      // }, 25000);
    
  }

}
