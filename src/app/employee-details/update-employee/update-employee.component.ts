import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  employeeList: any = [];
  empID: any;
  name = 'Guru';
  picId : any;
  picIdurl : any;
  // @ts-ignore
  updateEmployeeForm: FormGroup;
  constructor(
    private employeeService: EmployeeServiceService,
    private dataRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.updateEmployeeForm = new FormGroup({
      employeeName: new FormControl(''),
      gender: new FormControl(''),
      mobile: new FormControl(0),
      address: new FormControl(''),
      age: new FormControl(0),
    });

    this.dataRoute.params.subscribe((params) => {
      this.empID = params['id'];
    });

    this.employeeService.getEmployeeDetails().subscribe(
      (resp) => {
        
        const selected = resp.rows.filter((c: any) => c.id === this.empID)[0];

        this.employeeList = selected;
        this.picId = this.employeeList.profilePic
        this.picIdurl =  "https://nodeapp1fordmp.azurewebsites.net/getImage/" + this.picId
          this.updateEmployeeForm.patchValue({
            employeeName: this.employeeList.name,
            gender: this.employeeList.gender  ,
            age:  this.employeeList.age ,
            address:  this.employeeList.address,
            mobile: this.employeeList.mobileNo

         });
      },
      (err) => {
        console.log('HTTP Error', err);
      }
    );
  }

  onCancel(){
    this.router.navigate(['/home']);
  }

  onSubmit(){
    const f = this.updateEmployeeForm.value;

    const body = {
      name: f.employeeName,
      age: f.age,
      address: f.address,
      mobileNo: 8122382742,
    };


    console.log(body);
   
    this.employeeService.updateEmployee(this.empID,body).subscribe(
      (resp) => {
        
        this.onCancel();
      },
      (err) => {}
    );
  }
}
