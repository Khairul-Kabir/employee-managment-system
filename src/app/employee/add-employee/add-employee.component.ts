import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

 
  constructor(private ngWizardService: NgWizardService){
    
  }
  ngOnInit(): void {
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
      { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
    ],
  }
};
showPreviousStep(event?: Event) {
  this.ngWizardService.previous();
}
showNextStep(event?: Event) {
  this.ngWizardService.next();
}
resetWizard(event?: Event) {
  this.ngWizardService.reset();
}
setTheme(theme: THEME) {
  this.ngWizardService.theme(theme);
}
stepChanged(args: StepChangedArgs) {
  console.log(args.step);
}
isValidTypeBoolean: boolean = true;
isValidFunctionReturnsBoolean(args: StepValidationArgs) {
  return true;
}
isValidFunctionReturnsObservable(args: StepValidationArgs) {
  return of(true);
}
}