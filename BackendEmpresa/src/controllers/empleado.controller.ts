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
  HttpErrors,
} from '@loopback/rest';
import {Credenciales, Empleado} from '../models';
import {EmpleadoRepository} from '../repositories';
import { AutenticacionService } from '../services';
import { NotificacionesService } from '../services';

export class EmpleadoController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository : EmpleadoRepository,
    @service(AutenticacionService)
    public servicioAutenticacionEmpleado : AutenticacionService,
    @service(NotificacionesService)
    public notificacionesServices: NotificacionesService,
  ) {}

  @post('/empleados')
  @response(200, {
    description: 'Empleado model instance',
    content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleado',
            exclude: ['id'],
          }),
        },
      },
    })
    empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    let clave = this.servicioAutenticacionEmpleado.GenerarClave();
    let claveCifrada;
    if(empleado.clave==""){
      claveCifrada = this.servicioAutenticacionEmpleado.CifrarClave(clave);
    }else{
      claveCifrada = this.servicioAutenticacionEmpleado.CifrarClave(empleado.clave);
    }
    empleado.clave = claveCifrada;
    let e = await this.empleadoRepository.create(empleado);

    let asunto = `Servicio de Notificacion Por Email Empleado Team D Desarrolladores`;
    let mensaje = `Hola ${empleado.nombres} ${empleado.apellidos}, su nombre de usuario es: ${empleado.email} y su contraseña es ${clave}`;

    this.notificacionesServices.EnviarNotifiacionesPorCorreo(empleado.email, asunto, mensaje);
    this.notificacionesServices.EnviarNotifiacionesPorSMS(mensaje, empleado.telefono);
    return e;
  }

  @post("/identificarEmpleado", {
    responses:{
      '200':{
        description: "Identificacion del cliente"
      }
    }
  })
  async identificarEmpleado(
    @requestBody() credenciales: Credenciales
  ){
    let e = await this.servicioAutenticacionEmpleado.IdentificarEmpleado(credenciales.usuario, credenciales.clave)
    if(e){

      let token = this.servicioAutenticacionEmpleado.GenerarTokenJWTEmpleado(e);
      return {
        data: {
          nombres: e.nombres,
          apellidos: e.apellidos,
          email: e.email,
          id: e.id,
        },
        tk: token
      }
    }else{
      throw new HttpErrors[401]("Datos incorrectos")
    }
  }

  @get('/empleados/count')
  @response(200, {
    description: 'Empleado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Empleado) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empleadoRepository.count(where);
  }

  @get('/empleados')
  @response(200, {
    description: 'Array of Empleado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Empleado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Empleado) filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.empleadoRepository.find(filter);
  }

  @patch('/empleados')
  @response(200, {
    description: 'Empleado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Empleado,
    @param.where(Empleado) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empleadoRepository.updateAll(empleado, where);
  }

  @get('/empleados/{id}')
  @response(200, {
    description: 'Empleado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Empleado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Empleado, {exclude: 'where'}) filter?: FilterExcludingWhere<Empleado>
  ): Promise<Empleado> {
    return this.empleadoRepository.findById(id, filter);
  }

  @patch('/empleados/{id}')
  @response(204, {
    description: 'Empleado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Empleado,
  ): Promise<void> {
    await this.empleadoRepository.updateById(id, empleado);
  }

  @put('/empleados/{id}')
  @response(204, {
    description: 'Empleado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() empleado: Empleado,
  ): Promise<void> {
    await this.empleadoRepository.replaceById(id, empleado);
  }

  @del('/empleados/{id}')
  @response(204, {
    description: 'Empleado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.empleadoRepository.deleteById(id);
  }
}
