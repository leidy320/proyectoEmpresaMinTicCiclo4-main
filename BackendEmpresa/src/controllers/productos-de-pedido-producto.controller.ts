import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductosDePedido,
  Producto,
} from '../models';
import {ProductosDePedidoRepository} from '../repositories';

export class ProductosDePedidoProductoController {
  constructor(
    @repository(ProductosDePedidoRepository)
    public productosDePedidoRepository: ProductosDePedidoRepository,
  ) { }

  @get('/productos-de-pedidos/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to ProductosDePedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof ProductosDePedido.prototype.id,
  ): Promise<Producto> {
    return this.productosDePedidoRepository.producto(id);
  }
}
