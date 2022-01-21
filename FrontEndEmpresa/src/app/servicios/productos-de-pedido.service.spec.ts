import { TestBed } from '@angular/core/testing';

import { ProductosDePedidoService } from './productos-de-pedido.service';

describe('ProductosDePedidoService', () => {
  let service: ProductosDePedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosDePedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
