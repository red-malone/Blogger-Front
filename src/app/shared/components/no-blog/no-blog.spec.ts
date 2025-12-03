import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoBlog } from './no-blog';

describe('NoBlog', () => {
  let component: NoBlog;
  let fixture: ComponentFixture<NoBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoBlog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
