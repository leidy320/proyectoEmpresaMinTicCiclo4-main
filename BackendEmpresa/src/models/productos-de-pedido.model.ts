import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Pedido} from './pedido.model';
import {Producto} from './producto.model';

@model()
export class ProductosDePedido extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @belongsTo(() => Pedido)
  pedidoId: string;

  @belongsTo(() => Producto)
  productoId: string;

  constructor(data?: Partial<ProductosDePedido>) {
    super(data);
  }
}

export interface ProductosDePedidoRelations {
  // describe navigational properties here
}

export type ProductosDePedidoWithRelations = ProductosDePedido & ProductosDePedidoRelations;
