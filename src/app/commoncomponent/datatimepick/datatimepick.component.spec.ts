import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatimepickComponent } from './datatimepick.component';

describe('DatatimepickComponent', () => {
  let component: DatatimepickComponent;
  let fixture: ComponentFixture<DatatimepickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatimepickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatimepickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
