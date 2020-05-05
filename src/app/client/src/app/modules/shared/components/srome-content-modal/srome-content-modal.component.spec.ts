import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SromeContentModalComponent } from './srome-content-modal.component';

describe('SromeContentModalComponent', () => {
  let component: SromeContentModalComponent;
  let fixture: ComponentFixture<SromeContentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SromeContentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SromeContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
