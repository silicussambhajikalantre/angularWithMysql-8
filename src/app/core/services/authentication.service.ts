import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from 'ng4-social-login';
import { Router } from '@angular/router';
@Injectable()
export class AuthenticationService {
  public apiUrl;

  private isLoggedInStatus = false;
  isLoggedIn(value, name, email, google) {
    localStorage.setItem('isLoggedInStatus', value);
    localStorage.setItem('fullName', name);
    localStorage.setItem('emailId', email);
    localStorage.setItem('withGoogle', google);
  }
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    this.apiUrl = environment.apiUrl;
   }
  get loggedInStatus(){
    this.isLoggedInStatus = JSON.parse(localStorage.getItem('isLoggedInStatus'));
    return this.isLoggedInStatus;
  }
  
  
  getAuth(formData): Observable<any> {
    const email = formData.emailId;
    const password = formData.password;
    return this.http.post(`${this.apiUrl}/api/auth.php`, {
      email,
      password
    }, { responseType: 'json'});
  }

  isLoggedOut(withGoogle) {
    this.isLoggedIn(false, '', '', '');
    this.router.navigate(['login']);
  }

  signOut(): void{
    this.authService.signOut();
  }

}
