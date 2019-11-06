import { Component, OnInit, Input, OnChanges, ViewChild, SimpleChanges, SimpleChange } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() dataArrayFromParent: any;
  @Input() byYear: any;
  moviesArray: number[] = [];
  seriesArray: number[] = [];
  yearArray: string[] = [];
  constructor() { }

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

  set getInParent(e){
    console.log(e);
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}): void {
      if (this.dataArrayFromParent.length > 0) {
      this.moviesArray = [];
      this.seriesArray = [];
      this.yearArray = [];
      for (const element of this.dataArrayFromParent) {
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

 
}
