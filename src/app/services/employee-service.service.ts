import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  employee=[
    {
      firstName: "Khairul",
      lastName: "kabir",
      dateOfBirth: "01-12-1995",
      phone: "01714528596",
      gander: "Male",
      email: "kabir@gmail.com",
      password: "123456",
      skills: [
        {
          skillName:"Skill 1",
          yearOfExperience: 5,
          skillLevel:2
        },
      ]
    },

    {
      firstName: "Jhon",
      lastName: "Sena",
      dateOfBirth: "01-12-1988",
      phone: "01972594890",
      gander: "Male",
      email: "j@gmail.com",
      password: "123456",
      skills: [
        {
          skillName:"Skill 1",
          yearOfExperience: 5,
          skillLevel:2
        },
      ]
    },
    
  ]
  constructor() { }

  getAllEmployee(): Observable<Employee[]> {
    return of(this.employee).pipe(delay(1000));
  }

  searchEmployeeUsingEmailAndPassword(employee: Employee): Observable<any> {
    var data = this.employee.find((emp) => emp.email === employee.email && emp.password ===  employee.password);
    return of({ data }).pipe(delay(1000));
  }
}
