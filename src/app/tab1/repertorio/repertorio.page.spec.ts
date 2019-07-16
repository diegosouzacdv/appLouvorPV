import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepertorioPage } from './repertorio.page';

describe('RepertorioPage', () => {
  let component: RepertorioPage;
  let fixture: ComponentFixture<RepertorioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepertorioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepertorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
