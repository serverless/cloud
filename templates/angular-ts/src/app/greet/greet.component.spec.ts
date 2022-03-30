import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetComponent } from './greet.component';

describe('GreetComponent', () => {
  let component: GreetComponent;
  let fixture: ComponentFixture<GreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
