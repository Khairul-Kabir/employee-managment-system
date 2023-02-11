import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  employee=[
    {
      name: "Md. Kabir",
      phone: "01972594890",
      email: "kabir@gmail.com",
      password: "123456"
    }
  ]
  constructor() { }

  getAllEmployee(): Observable<Employee[]> {
    return of(this.employee).pipe(delay(1000));
  }
}
