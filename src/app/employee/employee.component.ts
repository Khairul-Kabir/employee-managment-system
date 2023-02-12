import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeStore } from '../store/employee.store';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
	employeeList!: Employee[];
	isAddEmployeeComponentVisable?: boolean;
  	page = 1;
	pageSize = 5;
	collectionSize = 1;
	countries?: Employee[];

	constructor(
		private activatedRoute: ActivatedRoute,
		private employeeStore : EmployeeStore) {
		this.refreshCountries();
	}

	ngOnInit(): void {
    	this.isAddEmployeeComponentVisable = false;
		this.getAllEmployees();
		//this.collectionSize = this.employeeList.length;
	}
	refreshCountries() {
		// this.countries = this.employeeList.map((country, i) => ({ id: i + 1, ...country })).slice(
		// 	(this.page - 1) * this.pageSize,
		// 	(this.page - 1) * this.pageSize + this.pageSize,
		// );
  }
	getAllEmployees(){
		this.activatedRoute.data.subscribe(data =>console.log(data));

		this.activatedRoute.data.subscribe((data) => {
			this.employeeList = data.employee;
		});
	}
  
  openAddEmployee(){
    this.isAddEmployeeComponentVisable = true;
  }
  backToEmployee(backToEmployeeFlag:any):void{
    this.isAddEmployeeComponentVisable = false;
  }
}
