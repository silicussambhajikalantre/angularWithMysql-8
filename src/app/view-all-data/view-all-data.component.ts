import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GetUsersService } from '../_services/get-users.service';
import { GetDataFromApiService } from '../_services/get-data-from-api.service';


@Component({
  selector: 'app-view-all-data',
  templateUrl: './view-all-data.component.html',
  styleUrls: ['./view-all-data.component.scss']
})
export class ViewAllDataComponent implements OnInit {
  public users;
  movieDetails: any;
  totalMovieResult: number;
  byYear2010: number;
  dataArray: Array<any> = [];
  public abc: {};
  @Output()
  myData: EventEmitter<any> = new EventEmitter<any>();
  byYear: any;
  doNotGoToAPI: boolean = true;
  constructor(private getUsersService: GetUsersService, private getDataFromApi: GetDataFromApiService) { }
  posts: object;
  ngOnInit() {

  }
  getUser(){
    this.getUsersService.getAllUsers()
    .subscribe(userData => this.users = userData);
  }
  getMovieTotalByYear(event) {
    this.doNotGoToAPI = true;
    const year = +event.currentTarget.value;
    const checkedValue = event.currentTarget.checked;
    const ifPresentInArray = this.dataArray.filter(element => (element.Year === year));
    if (ifPresentInArray.length === 0) {
      this.getDataFromApi.getMovieDataByYear(year).then((response) => {
        response.json().then((data) => {
            this.byYear2010 = data.totalResults;
            this.byYear = year;
            this.dataArray.push({ Movies : +this.byYear2010, Series : (500 - this.byYear2010), Year : year, Checkbox: checkedValue});
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
    if (!checkedValue) {
      this.dataArray = this.dataArray.filter(element => (element.Year !== year));
    }
  }
  getMyData() {
    this.getDataFromApi.getData(1).then((response) => {
      response.json().then((data) => {
        this.movieDetails = data.Search;
        this.totalMovieResult = (data.totalResults / 10);
      });
    })
    .catch(err => {
      console.log(err);
    });




  }
  sendData(year){
    this.getMovieTotalByYear(year);
    
  }


}
