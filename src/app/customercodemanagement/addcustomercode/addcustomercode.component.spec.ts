import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcustomercodeComponent } from './addcustomercode.component';

describe('AddcustomercodeComponent', () => {
  let component: AddcustomercodeComponent;
  let fixture: ComponentFixture<AddcustomercodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcustomercodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcustomercodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
