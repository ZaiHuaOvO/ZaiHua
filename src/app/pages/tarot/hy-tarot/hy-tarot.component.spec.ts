import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyTarotComponent } from './hy-tarot.component';

describe('HyTarotComponent', () => {
  let component: HyTarotComponent;
  let fixture: ComponentFixture<HyTarotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HyTarotComponent]
    });
    fixture = TestBed.createComponent(HyTarotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
