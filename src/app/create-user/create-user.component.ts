import { Component, OnInit } from '@angular/core';
import { GetUsersService } from '../_services/get-users.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public users: any;
  errorMsg: string;
  isErrorMsg: boolean = true;
  constructor(private getUsersService: GetUsersService, private getAuthenticationService: AuthenticationService, private router: Router) { }
  registerForm = new FormGroup({
    yourName: new FormControl(''),
    yourEmail: new FormControl(''),
    userName: new FormControl(''),
    gender: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  ngOnInit() {
    this.getUser();
  }
  onSubmit() {
  
    this.getUsersService.newInsertUsers(this.registerForm.value)
      .subscribe(data => {
        this.errorMsg = data['Message'];
        this.isErrorMsg = data['Success'];
        console.log(data);
        if (data['Success']) {
          this.router.navigate(['login']);
         }
       });
  }
  // formSubmit(event){
  //   event.preventDefault();
  //   const Name = event.target.querySelector('#Name').value;
  //   const userName = event.target.querySelector('#userName').value;
  //   const Password = event.target.querySelector('#Password').value;
  //   const Gender = event.target.querySelector('#Gender').value;
  //   const DOB = event.target.querySelector('#DOB').value;
  //    this.getUsersService.insertUsers(Name, userName, Password, Gender, DOB)
  //    .subscribe((res) => {
  //       if (res['Success']) {
  //         this.getUser();
  //       }
  //     });
  // }
  getUser(){
    this.getUsersService.getAllUsers()
    .subscribe(userData => this.users = userData);
  }
  deleteUserF(id: number){
      this.getUsersService
      .deleteUser(id)
      .subscribe((res) => {
        if (res['Success']) {
          this.getUser();
        }
      });
  }
  tryByEmployee(index: number,  user: any): number{
    return user.id;
  }
}