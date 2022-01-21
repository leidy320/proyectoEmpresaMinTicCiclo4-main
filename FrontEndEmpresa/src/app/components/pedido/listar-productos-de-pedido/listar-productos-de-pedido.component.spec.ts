import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProductosDePedidoComponent } from './listar-productos-de-pedido.component';

describe('ListarProductosDePedidoComponent', () => {
  let component: ListarProductosDePedidoComponent;
  let fixture: ComponentFixture<ListarProductosDePedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarProductosDePedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProductosDePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
