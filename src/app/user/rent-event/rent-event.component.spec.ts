import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentEventComponent } from './rent-event.component';

describe('RentEventComponent', () => {
  let component: RentEventComponent;
  let fixture: ComponentFixture<RentEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
