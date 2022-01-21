import {Entity, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Empleado} from './empleado.model';
import {Producto} from './producto.model';

@model()
export class Empresa extends Entity {
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
  razonSocial: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @hasMany(() => Cliente)
  clientes: Cliente[];

  @hasMany(() => Empleado)
  empleados: Empleado[];

  @hasMany(() => Producto)
  productos: Producto[];

  constructor(data?: Partial<Empresa>) {
    super(data);
  }
}

export interface EmpresaRelations {
  // describe navigational properties here
}

export type EmpresaWithRelations = Empresa & EmpresaRelations;
