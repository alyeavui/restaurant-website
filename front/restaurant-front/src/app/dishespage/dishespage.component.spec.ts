import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishespageComponent } from './dishespage.component';

describe('DishespageComponent', () => {
  let component: DishespageComponent;
  let fixture: ComponentFixture<DishespageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishespageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
