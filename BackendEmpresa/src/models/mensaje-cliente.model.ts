import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class MensajeCliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  mensajecliente: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  constructor(data?: Partial<MensajeCliente>) {
    super(data);
  }
}

export interface MensajeClienteRelations {
  // describe navigational properties here
}

export type MensajeClienteWithRelations = MensajeCliente & MensajeClienteRelations;
