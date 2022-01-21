import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {MensajeEmpleado} from '../models';
import {EmpleadoRepository, MensajeEmpleadoRepository} from '../repositories';
import {NotificacionesService} from '../services';

export class MensajeEmpleadoController {
  constructor(
    @repository(MensajeEmpleadoRepository)
    public mensajeEmpleadoRepository: MensajeEmpleadoRepository,
    // Se inyecta el repositorio de empleado
    @repository(EmpleadoRepository)
    public EmpleadoRepository: EmpleadoRepository,
    // Se inyecta el servicio de notificaciones
    @service(NotificacionesService)
    public notificacionesService: NotificacionesService,
  ) { }

  @post('/mensaje-empleados')
  @response(200, {
    description: 'MensajeEmpleado model instance',
    content: {'application/json': {schema: getModelSchemaRef(MensajeEmpleado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeEmpleado, {
            title: 'NewMensajeEmpleado',
            exclude: ['id'],
          }),
        },
      },
    })
    mensajeEmpleado: Omit<MensajeEmpleado, 'id'>,
  ): Promise<MensajeEmpleado> {
    // Se busca el empleado por el id
    let empleado = this.EmpleadoRepository.findById(mensajeEmpleado.empleadoId)
    // Si encuentra el empleado se captura el telefono
    if (empleado) {
      let phone: string = (await empleado).telefono;
      let asunto = `Servicio de Notificacion Por Email Empleado Team D Desarrolladores`;
      console.log("El empleado con id " + mensajeEmpleado.empleadoId + " fue encontrado.")
      console.log("El telefono del empleado " + (await empleado).nombres + " " + (await empleado).apellidos + " es " + phone)

      // Se llama al servicio de notificaciones
      this.notificacionesService.EnviarNotifiacionesPorSMS(mensajeEmpleado.mensaje, phone);
      this.notificacionesService.EnviarNotifiacionesPorCorreo((await empleado).email, asunto, mensajeEmpleado.mensaje);
      return this.mensajeEmpleadoRepository.create(mensajeEmpleado);
    } else {
      console.log("el id " + mensajeEmpleado.empleadoId + " no existe en la base de datos, el mensaje no fue enviado")
      return mensajeEmpleado;
    }
  }

  @get('/mensaje-empleados/count')
  @response(200, {
    description: 'MensajeEmpleado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MensajeEmpleado) where?: Where<MensajeEmpleado>,
  ): Promise<Count> {
    return this.mensajeEmpleadoRepository.count(where);
  }

  @get('/mensaje-empleados')
  @response(200, {
    description: 'Array of MensajeEmpleado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MensajeEmpleado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MensajeEmpleado) filter?: Filter<MensajeEmpleado>,
  ): Promise<MensajeEmpleado[]> {
    return this.mensajeEmpleadoRepository.find(filter);
  }

  @patch('/mensaje-empleados')
  @response(200, {
    description: 'MensajeEmpleado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeEmpleado, {partial: true}),
        },
      },
    })
    mensajeEmpleado: MensajeEmpleado,
    @param.where(MensajeEmpleado) where?: Where<MensajeEmpleado>,
  ): Promise<Count> {
    return this.mensajeEmpleadoRepository.updateAll(mensajeEmpleado, where);
  }

  @get('/mensaje-empleados/{id}')
  @response(200, {
    description: 'MensajeEmpleado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MensajeEmpleado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MensajeEmpleado, {exclude: 'where'}) filter?: FilterExcludingWhere<MensajeEmpleado>
  ): Promise<MensajeEmpleado> {
    return this.mensajeEmpleadoRepository.findById(id, filter);
  }

  @patch('/mensaje-empleados/{id}')
  @response(204, {
    description: 'MensajeEmpleado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MensajeEmpleado, {partial: true}),
        },
      },
    })
    mensajeEmpleado: MensajeEmpleado,
  ): Promise<void> {
    await this.mensajeEmpleadoRepository.updateById(id, mensajeEmpleado);
  }

  @put('/mensaje-empleados/{id}')
  @response(204, {
    description: 'MensajeEmpleado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mensajeEmpleado: MensajeEmpleado,
  ): Promise<void> {
    await this.mensajeEmpleadoRepository.replaceById(id, mensajeEmpleado);
  }

  @del('/mensaje-empleados/{id}')
  @response(204, {
    description: 'MensajeEmpleado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mensajeEmpleadoRepository.deleteById(id);
  }
}
