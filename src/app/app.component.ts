import { Component } from '@angular/core';
import { EmployeeStore } from './store/employee.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EmployeeStore],
})
export class AppComponent {
  constructor() {}
  title = 'employee-managment-system';
  
}
