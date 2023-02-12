import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeResolverService } from './services/employee-resolver.service';

const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'login', component: AuthenticationComponent },
  { 
    path: 'employee',
    component: EmployeeComponent,
    resolve: { employee: EmployeeResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
