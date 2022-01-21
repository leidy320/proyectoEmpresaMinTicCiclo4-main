import { TestBed } from '@angular/core/testing';

import { MensajesClienteService } from './mensajes-cliente.service';

describe('MensajesClienteService', () => {
  let service: MensajesClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajesClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
