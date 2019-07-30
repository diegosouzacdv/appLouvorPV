import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovogrupoPage } from './novogrupo.page';

describe('NovogrupoPage', () => {
  let component: NovogrupoPage;
  let fixture: ComponentFixture<NovogrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovogrupoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovogrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
