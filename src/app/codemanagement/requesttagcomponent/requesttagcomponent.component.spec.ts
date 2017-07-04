import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesttagcomponentComponent } from './requesttagcomponent.component';

describe('RequesttagcomponentComponent', () => {
  let component: RequesttagcomponentComponent;
  let fixture: ComponentFixture<RequesttagcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequesttagcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesttagcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
