import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ProyectoEmpresaDataSource} from '../datasources';
import {Cliente, ClienteRelations, Empresa, MensajeCliente, Pedido} from '../models';
import {EmpresaRepository} from './empresa.repository';
import {MensajeClienteRepository} from './mensaje-cliente.repository';
import {PedidoRepository} from './pedido.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly empresa: BelongsToAccessor<Empresa, typeof Cliente.prototype.id>;

  public readonly mensajeClientes: HasManyRepositoryFactory<MensajeCliente, typeof Cliente.prototype.id>;

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.proyectoEmpresa') dataSource: ProyectoEmpresaDataSource, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>, @repository.getter('MensajeClienteRepository') protected mensajeClienteRepositoryGetter: Getter<MensajeClienteRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Cliente, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    this.mensajeClientes = this.createHasManyRepositoryFactoryFor('mensajeClientes', mensajeClienteRepositoryGetter,);
    this.registerInclusionResolver('mensajeClientes', this.mensajeClientes.inclusionResolver);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }
}
