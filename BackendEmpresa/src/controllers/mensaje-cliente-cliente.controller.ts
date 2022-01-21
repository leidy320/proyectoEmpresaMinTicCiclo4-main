import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MensajeCliente,
  Cliente,
} from '../models';
import {MensajeClienteRepository} from '../repositories';

export class MensajeClienteClienteController {
  constructor(
    @repository(MensajeClienteRepository)
    public mensajeClienteRepository: MensajeClienteRepository,
  ) { }

  @get('/mensaje-clientes/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to MensajeCliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof MensajeCliente.prototype.id,
  ): Promise<Cliente> {
    return this.mensajeClienteRepository.cliente(id);
  }
}
