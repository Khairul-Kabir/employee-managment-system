import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { EmployeeComponent } from './employee/employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './authentication/login/login.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
 
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    EmployeeComponent,
    LoginComponent,
    AddEmployeeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgWizardModule.forRoot(ngWizardConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
