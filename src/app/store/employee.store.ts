import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
import { ComponentStore } from '@ngrx/component-store';
import { EmployeeServiceService } from "../services/employee-service.service";
import { concatMap, Observable, switchMap } from "rxjs";

export interface EmployeeState {
    employee: Employee[];
    singleEmployee: Employee;
  }

@Injectable()
export class EmployeeState extends ComponentStore<EmployeeState>{
    constructor(private employeeService: EmployeeServiceService) 
    {
        super();
    }

    // readonly searchEmployeeUsingEmailAndPassword$: Observable<Employee[]> = this.select(
    //     ({ employee, singleEmployee }) =>
    //     employee.filter((emp) =>
    //         emp.email.toLowerCase().includes(singleEmployee.email.toLowerCase()) && singleEmployee.password.toLowerCase().includes(singleEmployee.password.toLowerCase())
    //       )
    //   );

//     readonly getAllEmployee = this.effect((trigger$) =>
//     trigger$.pipe(
//       switchMap(() =>
//         this.employeeService.getAllEmployee().pipe(
//           this.toast.observe({
//             loading: 'Fetching...',
//             success: 'Contacts fetched!',
//             error: 'Could not fetch.',
//           }),
//           tap((contacts: Contact[]) => {
//             this.setContacts(contacts);
//           }),
//           catchError(() => EMPTY)
//         )
//       )
//     )
//   );

//     readonly searchEmployeeUsingEmailAndPassword = this.effect<Employee>((contact$) =>
//     contact$.pipe(
//       concatMap((employee) =>
//         this.employeeService.addContact(employee).pipe(
//           tap(() => this.fetchContacts()),
//           this.toast.observe({
//             loading: 'Adding contact...',
//             success: 'Contact added!',
//             error: 'Could not add.',
//           }),
//           catchError(() => EMPTY)
//         )
//       )
//     )
//   );
}
  