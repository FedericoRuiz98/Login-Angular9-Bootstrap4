import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { inputStates } from 'src/app/utils/enums';
import { inputController } from 'src/app/utils/inputController';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  private ic = new inputController();
  public is = inputStates;
  emailAndPasswordOkey = true;
  emailOkey = inputStates.idle;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.emailOkey = this.ic.checkInput(this.loginForm,'email');
  }

  async onLogin() {
    //input fields
    const {email, password} = this.loginForm.value;

    try {
      const user = await this.auth.login(email,password);
      console.log(this.loginForm.value);

      if(user) {
        //redirect to home after login
        this.emailAndPasswordOkey = true;
        this.router.navigate(['/home']);
      }else{
        this.emailAndPasswordOkey = false;
      }
    } catch (error) {
      console.log(error);      
    }

  }

}
