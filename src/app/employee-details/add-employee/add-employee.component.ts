import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  // @ts-ignore
  addEmployeeForm: FormGroup;

  constructor(
    private router: Router,
    private employeeService: EmployeeServiceService
  ) {}

  ngOnInit(): void {
    this.addEmployeeForm = new FormGroup({
      employeeName: new FormControl(''),
      gender: new FormControl(''),
      mobile: new FormControl(0),
      address: new FormControl(''),
      age: new FormControl(0),
    });
    
  }

  getGender(event: any) {
    console.log(event.target.value)
    // const e = event.target ? event.target.value : event;
  }

  onCancel() {
    this.router.navigate(['/home']);
  }
  onSubmit() {
    const f = this.addEmployeeForm.value;

    const body = {
      name: f.employeeName,
      age: f.age,
      address: f.address,
      gender: f.gender,
      mobileNo: 8122382742,
      role:"admin",
      active:true 
    };

    // plancost: f.plancost,

    console.log(body);
    this.employeeService.createEmployee(body).subscribe(
      (resp) => {
        
        this.onCancel();
      },
      (err) => {}
    );
  }
}
