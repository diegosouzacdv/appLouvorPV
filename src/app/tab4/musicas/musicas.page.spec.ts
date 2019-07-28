import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicasPage } from './musicas.page';

describe('MusicasPage', () => {
  let component: MusicasPage;
  let fixture: ComponentFixture<MusicasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
