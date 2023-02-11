import { Injectable } from "@angular/core";
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Employee } from "../models/employee.model";
import { ComponentStore } from '@ngrx/component-store';
import { EmployeeServiceService } from "../services/employee-service.service";
import { EMPTY } from "rxjs";
import { catchError, concatMap, filter, switchMap, tap } from 'rxjs/operators';
import { Router } from "@angular/router";

export interface EmployeeState {
    employee: Employee[];
    singleEmployee: string;
  }

@Injectable()
export class EmployeeStore extends ComponentStore<EmployeeState>{
    constructor(
        private employeeService: EmployeeServiceService,
        private toast: HotToastService,
        private router: Router,
        //private dialog: DialogService
        ) 
    {
        super(
            {   employee:[],
                singleEmployee: '',
            });

        //this.getAllEmployee();
    }

    readonly setEmployee = this.updater((state, employee: Employee[]) => ({
        ...state,
        employee,
      }));
      
    readonly getAllEmployee = this.effect((trigger$) =>
        trigger$.pipe(
        switchMap(() =>
            this.employeeService.getAllEmployee().pipe(
            this.toast.observe({
                loading: 'Fetching...',
                success: 'Contacts fetched!',
                error: 'Could not fetch.',
            }),
            tap((employee: Employee[]) => {
                this.setEmployee(employee);
            }),
            catchError(() => EMPTY)
            )
            )
        )
    );

    getAllEmployees(){
        return this.employeeService.getAllEmployee()
    }

//   readonly searchEmployeeUsingEmailAndPassword = this.effect<Employee>((employee$) =>
//     employee$.pipe(
//         concatMap((employee) =>
//             this.employeeService.searchEmployeeUsingEmailAndPassword(employee).pipe(
//             this.toast.observe({
//                 loading: 'Adding contact...',
//                 success: 'Contact added!',
//                 error: 'Could not add.',
//             }),
//             catchError(() => EMPTY)
//             )
//         )
//         )
//   );

  searchEmployeeUsingEmailAndPassword(employee: Employee){
    return this.employeeService.searchEmployeeUsingEmailAndPassword(employee)
  }
}



// .subscribe({
//     next: (response:Employee) => {
//       if(response!=null){
//         console.log(response);
//         result = response;
//         this.router.navigate(['/employee']);
//       }else{
//         //this.toastr.warning("Update failed", "Update");
//       }
//     console.log(response);
//     }
// });
// return result;