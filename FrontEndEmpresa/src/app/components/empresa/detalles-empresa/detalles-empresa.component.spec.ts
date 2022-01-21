import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEmpresaComponent } from './detalles-empresa.component';

describe('DetallesEmpresaComponent', () => {
  let component: DetallesEmpresaComponent;
  let fixture: ComponentFixture<DetallesEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
