import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequeststausComponent } from './requeststaus.component';

describe('RequeststausComponent', () => {
  let component: RequeststausComponent;
  let fixture: ComponentFixture<RequeststausComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequeststausComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequeststausComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
