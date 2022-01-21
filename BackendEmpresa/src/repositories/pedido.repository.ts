import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ProyectoEmpresaDataSource} from '../datasources';
import {Pedido, PedidoRelations, Cliente, ProductosDePedido} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ProductosDePedidoRepository} from './productos-de-pedido.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Pedido.prototype.id>;

  public readonly productosDePedidos: HasManyRepositoryFactory<ProductosDePedido, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.proyectoEmpresa') dataSource: ProyectoEmpresaDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ProductosDePedidoRepository') protected productosDePedidoRepositoryGetter: Getter<ProductosDePedidoRepository>,
  ) {
    super(Pedido, dataSource);
    this.productosDePedidos = this.createHasManyRepositoryFactoryFor('productosDePedidos', productosDePedidoRepositoryGetter,);
    this.registerInclusionResolver('productosDePedidos', this.productosDePedidos.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
