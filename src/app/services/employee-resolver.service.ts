import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { EmployeeServiceService } from './employee-service.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeResolverService implements Resolve<Employee[]> {

  constructor(private employeeServiceService : EmployeeServiceService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<Employee[]> | Promise<Employee[]> | Employee[] {
    return this.employeeServiceService.getAllEmployee();
  }
}
