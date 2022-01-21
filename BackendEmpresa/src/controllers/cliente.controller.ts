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
import {Cliente, Credenciales} from '../models';
import {ClienteRepository} from '../repositories';
import { AutenticacionService } from '../services';
import { NotificacionesService } from '../services';

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
    @service(AutenticacionService)
    public servicioAutenticacionCliente : AutenticacionService,
    @service(NotificacionesService)
    public notificacionesServices: NotificacionesService,
  ) {}

  @post('/login', {
   responses: {
    '200': {
    descripcion: 'login cliente',
    },
   },
   
  })

  async login(
  @requestBody() credenciales: Credenciales
    
  ){
      let p= await this.servicioAutenticacionCliente.IdentificarCliente(credenciales.usuario, credenciales.clave)
      if (p){
       let token = this.servicioAutenticacionCliente.GenerarTokenJWTCliente(p)
      return{
        datos:{
          nombre: p.nombres,
          correo: p.email,
          id: p.id,

        },
        tk: token
      }
   }
      else{
        throw new HttpErrors[401]("Datos invalidos");
      }
    }
  @post('/clientes')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    let clave = this.servicioAutenticacionCliente.GenerarClave();
    let claveCifrada;
    if(cliente.clave==""){
      claveCifrada = this.servicioAutenticacionCliente.CifrarClave(clave);
    }else{
      claveCifrada = this.servicioAutenticacionCliente.CifrarClave(cliente.clave);
    }
    cliente.clave = claveCifrada;
    let c = await this.clienteRepository.create(cliente);

    let asunto = `Servicio de Notificacion Por Email Cliente Team D Desarrolladores`;
    let mensaje = `Hola ${cliente.nombres} ${cliente.apellidos}, su nombre de usuario es: ${cliente.email} y su contraseña es ${clave}`;

    this.notificacionesServices.EnviarNotifiacionesPorCorreo(cliente.email, asunto, mensaje);
    this.notificacionesServices.EnviarNotifiacionesPorSMS(mensaje, cliente.telefono);
    return c;

  //  let mensaje = 'hola ${cliente.nombres},su nombre de usuario es: ${cliente.correo} y su contraseña es: ${clave}'
   //this.notification.
  }

  @post("/identificarCliente", {
    responses:{
      '200':{
        description: "Identificacion del cliente"
      }
    }
  })
  async identificarCliente(
    @requestBody() credenciales: Credenciales
  ){
    let c = await this.servicioAutenticacionCliente.IdentificarCliente(credenciales.usuario, credenciales.clave)
    if(c){

      let token = this.servicioAutenticacionCliente.GenerarTokenJWTCliente(c);
      return {
        data: {
          nombres: c.nombres,
          apellidos: c.apellidos,
          email: c.email,
          id: c.id,
        },
        tk: token
      }
    }else{
      throw new HttpErrors[401]("Datos incorrectos")
    }
  }

  @get('/clientes/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/clientes')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @patch('/clientes/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}
