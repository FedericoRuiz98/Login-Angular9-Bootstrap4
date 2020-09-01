import { FormGroup, FormControl } from '@angular/forms';
import { inputStates } from 'src/app/utils/enums';

export class inputController {

    public is = inputStates;

    checkInput(form: FormGroup, input: string) {
        if( form.controls[input].invalid && 
            form.controls[input].touched && 
            form.controls[input].value != '') {
            return inputStates.invalid;
          }else if(form.controls[input].valid){
            return inputStates.valid;
          }else if(form.controls[input].value == '' && form.controls[input].touched){
            return inputStates.empty;
          }else{
            return inputStates.idle;
          }
    }

    checkPasswordInput(form: FormGroup, inputPass1: string, inputPass2: string) {
      if(form.controls[inputPass1].touched || form.controls[inputPass2].touched) {
        if(form.controls[inputPass1].value === form.controls[inputPass2].value) {
          return true;
        }else{
          return false;
        }
      }
    }

}