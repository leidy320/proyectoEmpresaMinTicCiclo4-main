import { service } from '@loopback/core';
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
import {Cliente, MensajeCliente} from '../models';
import {MensajeClienteRepository} from '../repositories';
import {ClienteRepository} from '../repositories';
import {NotificacionesService} from '../services';

export class MensajeClienteController {
  constructor(
    @repository(MensajeClienteRepository)
    public mensajeClienteRepository : MensajeClienteRepository,
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
    @service(NotificacionesService)
    public notificacionesService : NotificacionesService,
  ) {}

  @post('/mensaje-clientes')
  @response(200, {
    description: 'MensajeCliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(MensajeCliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeCliente, {
            title: 'NewMensajeCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    mensajeCliente: Omit<MensajeCliente, 'id'>,
  ): Promise<MensajeCliente> {
    //obtener telefono del cliente, enviar notificacion SMS y guardar en BD
             //let c = this.clienteRepository.findOne(where:{id: mensajeCliente.clienteId});
    let c = this.clienteRepository.findById(mensajeCliente.clienteId);
    if(c){
      let telefono:string = (await c).telefono;
      let asunto = `Servicio de Notificacion Por Email Empleado Team D Desarrolladores`;
      console.log("telefono del cliente: " + telefono);
      this.notificacionesService.EnviarNotifiacionesPorSMS(mensajeCliente.mensajecliente, telefono);
      this.notificacionesService.EnviarNotifiacionesPorCorreo((await c).email, asunto, mensajeCliente.mensajecliente);
      return this.mensajeClienteRepository.create(mensajeCliente);
    }
    return new MensajeCliente;
  }

  @get('/mensaje-clientes/count')
  @response(200, {
    description: 'MensajeCliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MensajeCliente) where?: Where<MensajeCliente>,
  ): Promise<Count> {
    return this.mensajeClienteRepository.count(where);
  }

  @get('/mensaje-clientes')
  @response(200, {
    description: 'Array of MensajeCliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MensajeCliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MensajeCliente) filter?: Filter<MensajeCliente>,
  ): Promise<MensajeCliente[]> {
    return this.mensajeClienteRepository.find(filter);
  }

  @patch('/mensaje-clientes')
  @response(200, {
    description: 'MensajeCliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeCliente, {partial: true}),
        },
      },
    })
    mensajeCliente: MensajeCliente,
    @param.where(MensajeCliente) where?: Where<MensajeCliente>,
  ): Promise<Count> {
    return this.mensajeClienteRepository.updateAll(mensajeCliente, where);
  }

  @get('/mensaje-clientes/{id}')
  @response(200, {
    description: 'MensajeCliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MensajeCliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MensajeCliente, {exclude: 'where'}) filter?: FilterExcludingWhere<MensajeCliente>
  ): Promise<MensajeCliente> {
    return this.mensajeClienteRepository.findById(id, filter);
  }

  @patch('/mensaje-clientes/{id}')
  @response(204, {
    description: 'MensajeCliente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeCliente, {partial: true}),
        },
      },
    })
    mensajeCliente: MensajeCliente,
  ): Promise<void> {
    await this.mensajeClienteRepository.updateById(id, mensajeCliente);
  }

  @put('/mensaje-clientes/{id}')
  @response(204, {
    description: 'MensajeCliente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mensajeCliente: MensajeCliente,
  ): Promise<void> {
    await this.mensajeClienteRepository.replaceById(id, mensajeCliente);
  }

  @del('/mensaje-clientes/{id}')
  @response(204, {
    description: 'MensajeCliente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mensajeClienteRepository.deleteById(id);
  }
}
