import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlerequestComponent } from './handlerequest.component';

describe('HandlerequestComponent', () => {
  let component: HandlerequestComponent;
  let fixture: ComponentFixture<HandlerequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandlerequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandlerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
