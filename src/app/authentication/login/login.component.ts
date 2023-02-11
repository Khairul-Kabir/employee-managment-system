import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;

  constructor(private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['kabir@gmail.com', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  login(){
    this.router.navigate(['/employee']);
  }

  get loginFormControl() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.loginForm.invalid) {
          return;
      }

      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
      this.router.navigate(['/employee']);
  }

}
