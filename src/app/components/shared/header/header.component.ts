import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {

  public isLoged = false; 
  public user: any;

  constructor(private auth: AuthService) { }

  async ngOnInit() {
    console.log("header");
    
    this.user = await this.auth.getCurrentUser();
    if (this.user) {
      console.log(this.user);
      this.isLoged = true;
    }else{
      this.user = null;
      this.isLoged = false;
    }
  }

  onLogout() {
    this.auth.logout();
  }
}
