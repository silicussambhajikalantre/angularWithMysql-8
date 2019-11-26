import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GetUsersService } from '../../../../../core/services/get-users.service';
import { GetDataFromApiService } from '../../../../../core/services/get-data-from-api.service';
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
  barLoading: boolean = false;
  wholeArray = [];
  @Output()
  myData: EventEmitter<any> = new EventEmitter<any>();
  updateDataArray: any[];
  constructor(private getUsersService: GetUsersService, private getDataFromApi: GetDataFromApiService) { }

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{   
      ticks: {
        min: 0,
        max: 500,
    } }] },
  };  
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Movies' },
      { data: [], label: 'Series' }
  ];
  ngOnInit() {
    for ( let i = 1; i <= 10; i++ ) {
      this.mayBe(i);
    }
  }
  getUser(){
    this.getUsersService.getAllUsers()
    .subscribe(userData => this.users = userData);
  }
  getMovieTotalByYear(event) {
    this.barLoading = true;
    const year = +event.target.value;
    const checkedValue = event.target.checked;
    const ifPresentInArray = this.dataArray.filter(element => (element.Year === year));
    if (ifPresentInArray.length === 0) {
      this.getDataFromApi.getMovieDataByYear(year).then((response) => {
        response.json().then((data) => {
            this.byYear2010 = data.totalResults;
            this.dataArray.push({ Movies : +this.byYear2010, Series : (500 - this.byYear2010), Year : year, Checkbox: checkedValue});
        }).then(() => {
          
          this.setChart(this.dataArray);
        });
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      this.updateDataArray = [];
      if (!checkedValue) {
        this.updateDataArray = this.dataArray.filter(element => (element.Year == year));        
      }else {
        this.updateDataArray = this.dataArray.filter(element => (element.Year == year));
      }
      this.dataArray = this.dataArray.filter(element => (element.Year !== year));
      this.dataArray.push({ Movies: this.updateDataArray[0].Movies, Series: this.updateDataArray[0].Series, Year :  this.updateDataArray[0].Year, Checkbox: checkedValue  });
      this.setChart(this.dataArray);
    }

  }
mayBe(year){
  this.getDataFromApi.getDataFromTMDB(year).then((response) => {
    response.json().then((data1) => {
//        console.log(data1);
        this.wholeArray += data1;
    })
  })
  .catch(err => {
    console.log(err);
  });
}
  


  setChart(dataArray){
    this.dataArray =  dataArray;
    if (this.dataArray.length > 0) {
      this.moviesArray = [];
      this.seriesArray = [];
      this.yearArray = [];
      for (const element of this.dataArray) {
        if(element.Checkbox) {
          this.yearArray.push(element.Year);
          this.moviesArray.push(element.Movies);
          this.seriesArray.push(element.Series);
        }
      }
      this.barChartLabels = [...this.yearArray, ];
      this.barChartData  = [
        { data: [...this.moviesArray], label: 'Movies' },
        { data: [...this.seriesArray], label: 'Series' }
      ];
    } else {
      this.barChartLabels = [];
      this.barChartData  = [
        { data: [], label: 'Movies' },
        { data: [], label: 'Series' }
      ];
    }
    this.barLoading = false;
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
  getCheckBoxData(event){
    //console.logconsole.log(event);
    this.getMovieTotalByYear(event);
  }
}
