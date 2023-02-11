import { FormGroup,FormBuilder, Validators } from '@angular/forms'; 
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  basicForm!: FormGroup;
  skillForm!: FormGroup;
  submittedBasicForm = false;
  previousSteps?: number;
  currentSteps?: number;
  @Output() backToEmployeeList = new EventEmitter<boolean>();
 
  constructor(private ngWizardService: NgWizardService,private formBuilder: FormBuilder,){
    
  }
  ngOnInit(): void {
    this.basicForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      gander: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
  }
  get basicFormControl() { return this.basicForm.controls; }
  backToEmployee() {
    this.backToEmployeeList.emit(false);
  }
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      toolbarExtraButtons: [
        { text: 'Save', class: 'btn btn-primary', event: () => { 
            if(this.currentSteps==2){
              this.save()
            }else{
              alert(this.currentSteps)
            }
            
         }}
      ],
    }
  };
  basicFormSubmit(){

  }
  save(){

  }
  showPreviousStep(event?: Event) {
    if (this.basicForm.invalid) {
      return;
    }
    this.ngWizardService.previous();
  }
  showNextStep(event?: Event) {
    if (this.basicForm.invalid) {
      return;
    }
    this.ngWizardService.next();
  }
  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }
  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }
  stepChanged(args: StepChangedArgs) {
    var d = this.stepStates;
    this.previousSteps = args.previousStep.index;
    this.currentSteps = args.step.index;
    console.log(args.step);
    this.submittedBasicForm = true;

    if (this.basicForm.invalid) {
      var dd = this.stepStates;
      this.config.selected=0;
    }

    this.basicFormSubmit();
  }
  isValidTypeBoolean: boolean = true;
  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }
  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }
}