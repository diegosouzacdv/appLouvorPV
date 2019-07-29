import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovamusicaPage } from './novamusica.page';

describe('NovamusicaPage', () => {
  let component: NovamusicaPage;
  let fixture: ComponentFixture<NovamusicaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovamusicaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovamusicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
