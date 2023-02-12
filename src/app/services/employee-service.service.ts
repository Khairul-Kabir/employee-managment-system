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
          skillLevel:"2"
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
          skillLevel:"2"
        },
        
      ]
    },
    {
      firstName: "Amir",
      lastName: "Khan",
      dateOfBirth: "01-12-1680",
      phone: "0187452639",
      gander: "Male",
      email: "j@gmail.com",
      password: "123456",
      skills: [
        {
          skillName:"Skill 14",
          yearOfExperience: 5,
          skillLevel:"3"
        },
        
      ]
    },
    {
      firstName: "Tom",
      lastName: "Mark",
      dateOfBirth: "01-12-1785",
      phone: "0136587415",
      gander: "Male",
      email: "j@gmail.com",
      password: "123456",
      skills: [
        {
          skillName:"Skill 1",
          yearOfExperience: 5,
          skillLevel:"2"
        },
        
      ]
    },
    {
      firstName: "Merry",
      lastName: "Jen",
      dateOfBirth: "01-12-1698",
      phone: "0148745262",
      gander: "Female",
      email: "j@gmail.com",
      password: "123456",
      skills: [
        {
          skillName:"Skill 11",
          yearOfExperience: 5,
          skillLevel:"2"
        },
        
      ]
    },
    
  ]
  employeeTabInfo!: Employee;

  constructor() { }

  getAllEmployee(): Observable<Employee[]> {
    return of(this.employee).pipe(delay(1000));
  }

  addEmployeeTempInfo(employee: Employee): Observable<Employee>{
    this.employeeTabInfo=employee;
    return of(this.employeeTabInfo).pipe(delay(100));
  }
  getEmployeeTempInfo(): Observable<Employee>{
    return of(this.employeeTabInfo).pipe(delay(10));
  }

  addEmployee(newEmployee: Employee): Observable<Employee> {
    this.employee.unshift(newEmployee);
    return of(newEmployee).pipe(delay(1000));
  }

  searchEmployeeUsingEmailAndPassword(employee: Employee): Observable<any> {
    var data = this.employee.find((emp) => emp.email === employee.email && emp.password ===  employee.password);
    return of({ data }).pipe(delay(10));
  }
}
