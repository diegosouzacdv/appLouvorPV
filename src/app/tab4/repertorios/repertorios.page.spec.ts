import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepertoriosPage } from './repertorios.page';

describe('RepertoriosPage', () => {
  let component: RepertoriosPage;
  let fixture: ComponentFixture<RepertoriosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepertoriosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepertoriosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
