import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ProyectoEmpresaDataSource} from '../datasources';
import {ProductosDePedido, ProductosDePedidoRelations, Pedido, Producto} from '../models';
import {PedidoRepository} from './pedido.repository';
import {ProductoRepository} from './producto.repository';

export class ProductosDePedidoRepository extends DefaultCrudRepository<
  ProductosDePedido,
  typeof ProductosDePedido.prototype.id,
  ProductosDePedidoRelations
> {

  public readonly pedido: BelongsToAccessor<Pedido, typeof ProductosDePedido.prototype.id>;

  public readonly producto: BelongsToAccessor<Producto, typeof ProductosDePedido.prototype.id>;

  constructor(
    @inject('datasources.proyectoEmpresa') dataSource: ProyectoEmpresaDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(ProductosDePedido, dataSource);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
    this.pedido = this.createBelongsToAccessorFor('pedido', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedido', this.pedido.inclusionResolver);
  }
}
