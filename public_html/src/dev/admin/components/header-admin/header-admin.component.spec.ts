import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAdmin } from './header-admin.component';

describe('HeaderAdmin', () => {
  let component: HeaderAdmin;
  let fixture: ComponentFixture<HeaderAdmin>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAdmin ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
