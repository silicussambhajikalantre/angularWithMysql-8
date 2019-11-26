import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../../../core/services/authentication.service';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialUser  } from 'ng4-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    emailId: new FormControl(''),
    password: new FormControl(''),
  });
  errorMsg: string;
  isErrorMsg: boolean = true;
  private user: SocialUser;
  private loggedIn: boolean;
  constructor(private _auth: AuthenticationService, private router: Router, private authService: AuthService) { }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  ngOnInit() {
    //if (JSON.parse(localStorage.getItem('isLoggedInStatus'))) {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        if (this.loggedIn){
          this._auth.isLoggedIn(this.loggedIn, user.name, user.email, true);
          this.router.navigate(['dataVizualization']);
        }
      });
   // }
  }
  onSubmit() {
    console.warn(this.loginForm.value);
    this._auth.getAuth(this.loginForm.value).subscribe(data => {
      if (data.Success) {
        this._auth.isLoggedIn(data.Success, data.name, data.email, false);
        this.router.navigate(['createUser']);
      } else {
        this._auth.isLoggedIn(data.Success, data.name, data.email, false);
        this.errorMsg = data.Message;
        this.isErrorMsg = data.Success;
      }
    });
  }
}