import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartCheckboxComponent } from './bar-chart-checkbox.component';

describe('BarChartCheckboxComponent', () => {
  let component: BarChartCheckboxComponent;
  let fixture: ComponentFixture<BarChartCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarChartCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
