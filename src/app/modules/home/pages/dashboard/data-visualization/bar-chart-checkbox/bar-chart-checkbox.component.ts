import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'ng4-social-login';

@Component({
  selector: 'app-bar-chart-checkbox',
  templateUrl: './bar-chart-checkbox.component.html',
  styleUrls: ['./bar-chart-checkbox.component.scss']
})
export class BarChartCheckboxComponent implements OnInit {
  @Output() checkBoxCheck: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }
  sendData(event){
    this.checkBoxCheck.emit(event);
  }
}
