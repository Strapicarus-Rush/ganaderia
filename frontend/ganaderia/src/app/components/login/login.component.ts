import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatCommonModule } from '@angular/material/core';

@Component({
  selector: 'ganaderia-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor( public router: Router, public authenticationService: AuthService) {

  }
  ngOnInit(){
    // if(AuthService.getUserDataValue().isLoggedIn){

    // }
  }
  public logIn() {
    
  }

}
