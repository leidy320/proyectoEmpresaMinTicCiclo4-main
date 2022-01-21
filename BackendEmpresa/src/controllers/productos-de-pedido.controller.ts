import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ProductosDePedido} from '../models';
import {ProductosDePedidoRepository} from '../repositories';

export class ProductosDePedidoController {
  constructor(
    @repository(ProductosDePedidoRepository)
    public productosDePedidoRepository : ProductosDePedidoRepository,
  ) {}

  @post('/productos-de-pedidos')
  @response(200, {
    description: 'ProductosDePedido model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductosDePedido)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosDePedido, {
            title: 'NewProductosDePedido',
            exclude: ['id'],
          }),
        },
      },
    })
    productosDePedido: Omit<ProductosDePedido, 'id'>,
  ): Promise<ProductosDePedido> {
    return this.productosDePedidoRepository.create(productosDePedido);
  }

  @get('/productos-de-pedidos/count')
  @response(200, {
    description: 'ProductosDePedido model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductosDePedido) where?: Where<ProductosDePedido>,
  ): Promise<Count> {
    return this.productosDePedidoRepository.count(where);
  }

  @get('/productos-de-pedidos')
  @response(200, {
    description: 'Array of ProductosDePedido model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductosDePedido, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductosDePedido) filter?: Filter<ProductosDePedido>,
  ): Promise<ProductosDePedido[]> {
    return this.productosDePedidoRepository.find(filter);
  }

  @patch('/productos-de-pedidos')
  @response(200, {
    description: 'ProductosDePedido PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosDePedido, {partial: true}),
        },
      },
    })
    productosDePedido: ProductosDePedido,
    @param.where(ProductosDePedido) where?: Where<ProductosDePedido>,
  ): Promise<Count> {
    return this.productosDePedidoRepository.updateAll(productosDePedido, where);
  }

  @get('/productos-de-pedidos/{id}')
  @response(200, {
    description: 'ProductosDePedido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductosDePedido, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProductosDePedido, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductosDePedido>
  ): Promise<ProductosDePedido> {
    return this.productosDePedidoRepository.findById(id, filter);
  }

  @patch('/productos-de-pedidos/{id}')
  @response(204, {
    description: 'ProductosDePedido PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosDePedido, {partial: true}),
        },
      },
    })
    productosDePedido: ProductosDePedido,
  ): Promise<void> {
    await this.productosDePedidoRepository.updateById(id, productosDePedido);
  }

  @put('/productos-de-pedidos/{id}')
  @response(204, {
    description: 'ProductosDePedido PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() productosDePedido: ProductosDePedido,
  ): Promise<void> {
    await this.productosDePedidoRepository.replaceById(id, productosDePedido);
  }

  @del('/productos-de-pedidos/{id}')
  @response(204, {
    description: 'ProductosDePedido DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productosDePedidoRepository.deleteById(id);
  }
}
