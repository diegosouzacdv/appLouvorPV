import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMusicaPage } from './editar-musica.page';

describe('EditarMusicaPage', () => {
  let component: EditarMusicaPage;
  let fixture: ComponentFixture<EditarMusicaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarMusicaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMusicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
