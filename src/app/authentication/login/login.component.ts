import { FormGroup,FormBuilder, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmployeeStore } from 'src/app/store/employee.store';
import { Employee } from 'src/app/models/employee.model';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private employeeStore: EmployeeStore,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
    
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['kabir@gmail.com', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get loginFormControl() { return this.loginForm.controls; }

  login() {
    this.spinner.show();
      this.submitted = true;
      if (this.loginForm.invalid) {
          return;
      }
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
      this.employeeStore.searchEmployeeUsingEmailAndPassword(this.loginForm.value)
          .subscribe({
            next: (response:any)=>{
              if(response.data!==undefined){
                this.router.navigate(['/employee']);
                this.spinner.hide();
                this.toastr.success('Login Successful', 'Success !');
              }else{
                this.toastr.error('Login failed', 'Failed !');
              }
            },
            error:(error)=>{
              //console.log(error);
              this.toastr.error(error, 'Login failed!');
              this.spinner.hide();
            }
          });
      }
}
