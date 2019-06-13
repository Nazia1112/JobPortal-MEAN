import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowresumeComponent } from './showresume.component';

describe('ShowresumeComponent', () => {
  let component: ShowresumeComponent;
  let fixture: ComponentFixture<ShowresumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowresumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
