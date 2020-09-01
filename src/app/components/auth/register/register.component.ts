import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { inputStates } from 'src/app/utils/enums';
import { inputController } from 'src/app/utils/inputController';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  public is = inputStates;
  private ic = new inputController();
  passwordOkey = inputStates.idle;
  confirmPasswordOkey = inputStates.idle;
  passAreEquals = true;
  emailOkey = inputStates.idle;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

  ngDoCheck() {
    this.emailOkey = this.ic.checkInput(this.registerForm,'email');
    this.passwordOkey = this.ic.checkInput(this.registerForm,'password');
    this.confirmPasswordOkey = this.ic.checkInput(this.registerForm,'confirmPassword');

    this.passAreEquals = this.ic.checkPasswordInput(this.registerForm,'password','confirmPassword');
    /*
    if(this.registerForm.controls['email'].invalid && this.registerForm.controls['email'].touched && this.registerForm.controls['email'].value != '') {
      this.emailOkey = inputStates.invalid;
    }else if(this.registerForm.controls['email'].valid){
      this.emailOkey = inputStates.valid;
    }else if(this.registerForm.controls['email'].value == '' && this.registerForm.controls['email'].touched){
      this.emailOkey = inputStates.empty;
    }else{
      this.emailOkey = inputStates.idle;
    }*/
  }

  async onRegister() {
    //inpput fields
    const {email, password} = this.registerForm.value;

    try {
      const user = await this.auth.register(email, password);
      console.log(this.registerForm.value);

      //redirect to login
      if(user) {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.log(error);      
    }
    
    
  }

}
