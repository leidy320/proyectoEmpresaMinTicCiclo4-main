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
  Pedido,
} from '../models';
import {ProductosDePedidoRepository} from '../repositories';

export class ProductosDePedidoPedidoController {
  constructor(
    @repository(ProductosDePedidoRepository)
    public productosDePedidoRepository: ProductosDePedidoRepository,
  ) { }

  @get('/productos-de-pedidos/{id}/pedido', {
    responses: {
      '200': {
        description: 'Pedido belonging to ProductosDePedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedido)},
          },
        },
      },
    },
  })
  async getPedido(
    @param.path.string('id') id: typeof ProductosDePedido.prototype.id,
  ): Promise<Pedido> {
    return this.productosDePedidoRepository.pedido(id);
  }
}
