import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GetUsersService } from '../_services/get-users.service';
import { GetDataFromApiService } from '../_services/get-data-from-api.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.scss']
})
export class DataVisualizationComponent implements OnInit {
  public users;
  movieDetails: any;
  totalMovieResult: number;
  byYear2010: number;
  dataArray: Array<any> = [];
  moviesArray: number[] = [];
  seriesArray: number[] = [];
  yearArray: string[] = [];
  public abc: {};
  @Output()
  myData: EventEmitter<any> = new EventEmitter<any>();
  byYear: any;
  doNotGoToAPI: boolean = true;
  constructor(private getUsersService: GetUsersService, private getDataFromApi: GetDataFromApiService) { }
  posts: object;
  
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  
  public barChartLabels: Label[] = ['2020', '2021'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  sm = 20;
  public barChartData: ChartDataSets[] = [
    { data: [59, 80], label: 'Movies' },
      { data: [100, 40], label: 'Series' }
  ];
  ngOnInit() {

  }
  getUser(){
    this.getUsersService.getAllUsers()
    .subscribe(userData => this.users = userData);
  }
  getMovieTotalByYear(event) {
    this.doNotGoToAPI = true;
    const year = +event.target.value;
    const checkedValue = event.target.checked;
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

    if (this.dataArray.length > 0) {
      this.moviesArray = [];
      this.seriesArray = [];
      this.yearArray = [];
      for (const element of this.dataArray) {
        this.yearArray.push(element.Year);
        this.moviesArray.push(element.Movies);
        this.seriesArray.push(element.Series);
      }
      this.barChartLabels = [...this.yearArray, '2020', '2021'];
      this.barChartData  = [
        { data: [...this.moviesArray, 59, 80], label: 'Movies' },
        { data: [...this.seriesArray, 100, 40], label: 'Series' }
      ];
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
  getCheckBoxData(event){
    console.log(event);
    this.getMovieTotalByYear(event);
  }
}
