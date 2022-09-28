import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { FileuploadPopupComponentComponent } from 'src/app/fileupload-popup-component/fileupload-popup-component.component';
// import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employeeList: any = [];
  allowAccess = false;
  constructor(
    private employeeService: EmployeeServiceService,
    private modalService: NgbModal,
    // private socketIoService: SocketioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
    this.allowAccess = true;
    
  }

  getEmployeeList() {
    this.employeeService.getEmployeeDetails().subscribe(
      (resp) => {
        this.employeeList = resp.rows;
      },
      (err) => {
        console.log('HTTP Error', err);
      }
    );
  }
  onViewPointcloud(){
    this.router.navigate(['/pointcloud']);
  }
  onNavigate() {
    this.router.navigate(['/employee']);
  }
  onUpdate(id: any) {
    this.router.navigate([`/updateEmployee/${id}`]);
  }

  oncheck(id: any) {
    let empID = id;

    const selected = this.employeeList.filter((c: any) => c.id === empID)[0];

    const data: any = {};

    data['id'] = empID;
    data['active'] = !selected.active;
  }
  onDelete(name: string) {
    const selected = this.employeeList.filter((c: any) => c.name === name)[0];
    const body = {
      name: selected.name,
      age: selected.age,
      address: selected.address,
      gender: selected.gender,
      mobileNo: 8122382742,
    };

    let id = selected.id;
    this.employeeService.deleteEmployee(id, body).subscribe(
      (resp) => {
        this.getEmployeeList();
      },
      (err) => {}
    );
  }

  openPopup(id: any) {
    const modalRef = this.modalService.open(FileuploadPopupComponentComponent);
    modalRef.componentInstance.employeeid = id;
    // modalRef.componentInstance.saveTemplate.subscribe((receivedEntry) => {
    //   this.landingPageService
    //     .uploadDocument(receivedEntry.fileToUpload, this.workOrderId)
    //     .subscribe((resp) => {
    //       this.getUploadedDocuments();
    //     });
    // });
  }
}
