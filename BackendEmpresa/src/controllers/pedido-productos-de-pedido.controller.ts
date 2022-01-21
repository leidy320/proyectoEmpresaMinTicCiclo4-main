import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pedido,
  ProductosDePedido,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoProductosDePedidoController {
  constructor(
    @repository(PedidoRepository) protected pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/productos-de-pedidos', {
    responses: {
      '200': {
        description: 'Array of Pedido has many ProductosDePedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductosDePedido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProductosDePedido>,
  ): Promise<ProductosDePedido[]> {
    return this.pedidoRepository.productosDePedidos(id).find(filter);
  }

  @post('/pedidos/{id}/productos-de-pedidos', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductosDePedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedido.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosDePedido, {
            title: 'NewProductosDePedidoInPedido',
            exclude: ['id'],
            optional: ['pedidoId']
          }),
        },
      },
    }) productosDePedido: Omit<ProductosDePedido, 'id'>,
  ): Promise<ProductosDePedido> {
    return this.pedidoRepository.productosDePedidos(id).create(productosDePedido);
  }

  @patch('/pedidos/{id}/productos-de-pedidos', {
    responses: {
      '200': {
        description: 'Pedido.ProductosDePedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosDePedido, {partial: true}),
        },
      },
    })
    productosDePedido: Partial<ProductosDePedido>,
    @param.query.object('where', getWhereSchemaFor(ProductosDePedido)) where?: Where<ProductosDePedido>,
  ): Promise<Count> {
    return this.pedidoRepository.productosDePedidos(id).patch(productosDePedido, where);
  }

  @del('/pedidos/{id}/productos-de-pedidos', {
    responses: {
      '200': {
        description: 'Pedido.ProductosDePedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductosDePedido)) where?: Where<ProductosDePedido>,
  ): Promise<Count> {
    return this.pedidoRepository.productosDePedidos(id).delete(where);
  }
}
