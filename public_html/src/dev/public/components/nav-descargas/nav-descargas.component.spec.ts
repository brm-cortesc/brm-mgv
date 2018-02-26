import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDesComponent } from './nav-descargas.component';

describe('NavDesComponent', () => {
  let component: NavDesComponent;
  let fixture: ComponentFixture<NavDesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavDesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
