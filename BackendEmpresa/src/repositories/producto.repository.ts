import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ProyectoEmpresaDataSource} from '../datasources';
import {Producto, ProductoRelations, Empresa, ProductosDePedido} from '../models';
import {EmpresaRepository} from './empresa.repository';
import {ProductosDePedidoRepository} from './productos-de-pedido.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly empresa: BelongsToAccessor<Empresa, typeof Producto.prototype.id>;

  public readonly productosDePedidos: HasManyRepositoryFactory<ProductosDePedido, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.proyectoEmpresa') dataSource: ProyectoEmpresaDataSource, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>, @repository.getter('ProductosDePedidoRepository') protected productosDePedidoRepositoryGetter: Getter<ProductosDePedidoRepository>,
  ) {
    super(Producto, dataSource);
    this.productosDePedidos = this.createHasManyRepositoryFactoryFor('productosDePedidos', productosDePedidoRepositoryGetter,);
    this.registerInclusionResolver('productosDePedidos', this.productosDePedidos.inclusionResolver);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }
}
