import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorlistComponent } from './generatorlist.component';

describe('GeneratorlistComponent', () => {
  let component: GeneratorlistComponent;
  let fixture: ComponentFixture<GeneratorlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratorlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
