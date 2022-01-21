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
  Cliente,
  MensajeCliente,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteMensajeClienteController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/mensaje-clientes', {
    responses: {
      '200': {
        description: 'Array of Cliente has many MensajeCliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MensajeCliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<MensajeCliente>,
  ): Promise<MensajeCliente[]> {
    return this.clienteRepository.mensajeClientes(id).find(filter);
  }

  @post('/clientes/{id}/mensaje-clientes', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(MensajeCliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeCliente, {
            title: 'NewMensajeClienteInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) mensajeCliente: Omit<MensajeCliente, 'id'>,
  ): Promise<MensajeCliente> {
    return this.clienteRepository.mensajeClientes(id).create(mensajeCliente);
  }

  @patch('/clientes/{id}/mensaje-clientes', {
    responses: {
      '200': {
        description: 'Cliente.MensajeCliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeCliente, {partial: true}),
        },
      },
    })
    mensajeCliente: Partial<MensajeCliente>,
    @param.query.object('where', getWhereSchemaFor(MensajeCliente)) where?: Where<MensajeCliente>,
  ): Promise<Count> {
    return this.clienteRepository.mensajeClientes(id).patch(mensajeCliente, where);
  }

  @del('/clientes/{id}/mensaje-clientes', {
    responses: {
      '200': {
        description: 'Cliente.MensajeCliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MensajeCliente)) where?: Where<MensajeCliente>,
  ): Promise<Count> {
    return this.clienteRepository.mensajeClientes(id).delete(where);
  }
}
