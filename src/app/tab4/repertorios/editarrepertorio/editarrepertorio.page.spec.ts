import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarrepertorioPage } from './editarrepertorio.page';

describe('EditarrepertorioPage', () => {
  let component: EditarrepertorioPage;
  let fixture: ComponentFixture<EditarrepertorioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarrepertorioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarrepertorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
