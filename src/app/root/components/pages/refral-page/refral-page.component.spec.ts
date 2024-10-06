import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefralPageComponent } from './refral-page.component';

describe('RefralPageComponent', () => {
  let component: RefralPageComponent;
  let fixture: ComponentFixture<RefralPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefralPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefralPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
