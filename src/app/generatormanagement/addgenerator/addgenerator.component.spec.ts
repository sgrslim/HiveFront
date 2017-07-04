import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgeneratorComponent } from './addgenerator.component';

describe('AddgeneratorComponent', () => {
  let component: AddgeneratorComponent;
  let fixture: ComponentFixture<AddgeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddgeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
