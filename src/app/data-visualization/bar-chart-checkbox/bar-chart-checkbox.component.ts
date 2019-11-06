import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bar-chart-checkbox',
  templateUrl: './bar-chart-checkbox.component.html',
  styleUrls: ['./bar-chart-checkbox.component.scss']
})
export class BarChartCheckboxComponent implements OnInit {
  @Output() checkBoxCheck: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  sendData(event){
    this.checkBoxCheck.emit(event);
  }
}
