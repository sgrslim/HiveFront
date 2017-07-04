import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercodelistComponent } from './customercodelist.component';

describe('CustomercodelistComponent', () => {
  let component: CustomercodelistComponent;
  let fixture: ComponentFixture<CustomercodelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomercodelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomercodelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
