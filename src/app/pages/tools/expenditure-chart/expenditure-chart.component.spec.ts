import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureChartComponent } from './expenditure-chart.component';

describe('ExpenditureChartComponent', () => {
  let component: ExpenditureChartComponent;
  let fixture: ComponentFixture<ExpenditureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenditureChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenditureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
