import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditargrupoPage } from './editargrupo.page';

describe('EditargrupoPage', () => {
  let component: EditargrupoPage;
  let fixture: ComponentFixture<EditargrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditargrupoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditargrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
