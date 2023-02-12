import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
	closeResult = '';
	employeePreview?: Employee;

	constructor(
		private router: Router,
		private modalService: NgbModal,
		private activatedRoute: ActivatedRoute,
		private employeeStore : EmployeeStore) {
	}

	ngOnInit(): void {
    	this.isAddEmployeeComponentVisable = false;
		this.getAllEmployees();
		this.collectionSize = this.employeeList.length;
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
  Logout(){
	this.router.navigate(['/login']);
  }
  open(content: any,employee: Employee) {
	this.modalService.open(content, { size: 'lg' });
		this.employeePreview = employee;
	}
	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}
