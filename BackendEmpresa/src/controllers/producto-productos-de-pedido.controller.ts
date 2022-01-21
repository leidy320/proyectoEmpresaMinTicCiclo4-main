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
  Producto,
  ProductosDePedido,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoProductosDePedidoController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/productos-de-pedidos', {
    responses: {
      '200': {
        description: 'Array of Producto has many ProductosDePedido',
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
    return this.productoRepository.productosDePedidos(id).find(filter);
  }

  @post('/productos/{id}/productos-de-pedidos', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductosDePedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosDePedido, {
            title: 'NewProductosDePedidoInProducto',
            exclude: ['id'],
            optional: ['productoId']
          }),
        },
      },
    }) productosDePedido: Omit<ProductosDePedido, 'id'>,
  ): Promise<ProductosDePedido> {
    return this.productoRepository.productosDePedidos(id).create(productosDePedido);
  }

  @patch('/productos/{id}/productos-de-pedidos', {
    responses: {
      '200': {
        description: 'Producto.ProductosDePedido PATCH success count',
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
    return this.productoRepository.productosDePedidos(id).patch(productosDePedido, where);
  }

  @del('/productos/{id}/productos-de-pedidos', {
    responses: {
      '200': {
        description: 'Producto.ProductosDePedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductosDePedido)) where?: Where<ProductosDePedido>,
  ): Promise<Count> {
    return this.productoRepository.productosDePedidos(id).delete(where);
  }
}
