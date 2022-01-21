import { TestBed } from '@angular/core/testing';

import { MensajesEmpleadoService } from './mensajes-empleado.service';

describe('MensajesEmpleadoService', () => {
  let service: MensajesEmpleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajesEmpleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
