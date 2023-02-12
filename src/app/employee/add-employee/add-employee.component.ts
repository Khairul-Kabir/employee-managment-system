import { FormGroup,FormBuilder, Validators } from '@angular/forms'; 
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { EmployeeStore } from 'src/app/store/employee.store';
import { Employee, EmployeeSkill } from 'src/app/models/employee.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  basicForm!: FormGroup;
  skillForm!: FormGroup;
  submittedBasicForm = false;
  submittedSkillForm = false;
  previousSteps?: string;
  currentSteps?= "Basic";
  employeeInfo?:Employee;
  employeePreview?: Employee;
  @Output() backToEmployeeList = new EventEmitter<boolean>();
  skills?= [
    {
      name:"Beginner",
      value:"Beginner"
    },
    {
      name:"Intermediate",
      value:"Intermediate"
    },
    {
      name:"Advanced",
      value:"Advanced"
    }
]
 
  constructor(
    private formBuilder: FormBuilder,
    private employeeStore: EmployeeStore,
    private toastr: ToastrService
    ){
    
  }
  ngOnInit(): void {
    this.basicForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      phone: [null, [Validators.required, Validators.minLength(11),Validators.maxLength(11)]],
      gander: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });

    this.skillForm = this.formBuilder.group({
      skillName:['', [Validators.required]],
      yearOfExperience:['', [Validators.required]],
      skillLevel: ['', [Validators.required]]
    });

  }
  get basicFormControl() { return this.basicForm.controls; }
  get skillFormControl() { return this.skillForm.controls; }
  
  backToEmployee() {
    this.backToEmployeeList.emit(false);
  }
  goToBasic(){
    this.currentSteps="Basic";
  }
  goToSkill(){
    this.basicFormSubmit();
  }
  goToPreview(){
    this.skillFormSubmit();
  }

  basicFormSubmit(){
    this.submittedBasicForm = true;
    if(this.basicForm.invalid){
      return;
    }else{
      this.saveTabInfo("Skill");
    }
  }
 skillFormSubmit(){
    this.submittedSkillForm = true;
    if(this.basicForm.invalid || this.skillForm.invalid){
      return;
    }else{
      this.saveTabInfo("Preview");
    }
  }
  saveTabInfo(step: string){
    var skillInfos = [];
    skillInfos.push(this.skillForm.value) 
    var employeeInfo: Employee ={
      firstName: this.basicForm.value.firstName,
      lastName: this.basicForm.value.lastName,
      dateOfBirth: this.basicForm.value.dateOfBirth,
      phone: this.basicForm.value.phone,
      gander: this.basicForm.value.gander,
      email: this.basicForm.value.email,
      skills: skillInfos,
      password: ''
    }
    this.employeeStore.addEmployeeTempInfo(employeeInfo)
        .subscribe({
          next: (response:Employee)=>{
          if(response!==undefined){
             this.currentSteps = step;
             if(step=="Preview"){
              this.loadPreviewDataFromNGRX();
             }
          }
        }
      });
  }
  save(){
    var employeeInfo: Employee ={
      firstName: this.basicForm.value.firstName,
      lastName: this.basicForm.value.lastName,
      dateOfBirth: this.basicForm.value.dateOfBirth,
      phone: this.basicForm.value.phone,
      gander: this.basicForm.value.gander,
      email: this.basicForm.value.email,
      skills: this.skillForm.value,
      password: ''
    }
    this.employeeStore.addEmployee(employeeInfo)
    .subscribe({
      next: (response:Employee)=>{
      if(response!==undefined){
        this.toastr.success('Save Successful', 'Success !');
         this.backToEmployee();
      }
    }
  });
  }

  loadPreviewDataFromNGRX() {

    this.employeeStore.getEmployeeTempInfo()
          .subscribe({
            next: (response:Employee)=>{
            if(response!==undefined){
               this.employeePreview = response;
            }
          }
        });
  }
  
}

