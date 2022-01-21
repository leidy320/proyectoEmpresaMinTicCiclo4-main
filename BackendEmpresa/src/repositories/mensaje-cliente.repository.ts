import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ProyectoEmpresaDataSource} from '../datasources';
import {MensajeCliente, MensajeClienteRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class MensajeClienteRepository extends DefaultCrudRepository<
  MensajeCliente,
  typeof MensajeCliente.prototype.id,
  MensajeClienteRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof MensajeCliente.prototype.id>;

  constructor(
    @inject('datasources.proyectoEmpresa') dataSource: ProyectoEmpresaDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(MensajeCliente, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
