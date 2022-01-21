import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Llaves } from '../config/llaves';
import { Cliente, Empleado } from '../models';
import { ClienteRepository, EmpleadoRepository } from '../repositories';
//npm i crypto-js
//npm i password-generator
//npm i jsonwebtoken
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository
  ) {}

  /*
   * Add service methods here
   */
  GenerarClave(){
    let clave = generador(8, false);//longitud de password, intensidad de contraseña
    return clave;
  }

  CifrarClave(clave:string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarCliente(usuario:string, clave:string){
    try {
      let c = this.clienteRepository.findOne({where:{email: usuario, clave: clave}});
      if(c){
        return c;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  IdentificarEmpleado(usuario:string, clave:string){
    try {
      let e = this.empleadoRepository.findOne({where:{email: usuario, clave: clave}});
      if(e){
        return e;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  GenerarTokenJWTCliente(cliente: Cliente){
    let token = jwt.sign({
      data:{
        id: cliente.id,
        email: cliente.email,
        nombre: cliente.nombres + " " + cliente.apellidos,
        rol: "Cliente"
      }
    },
    Llaves.claveJWT);
    return token;
  }

  GenerarTokenJWTEmpleado(empleado: Empleado){
    let token = jwt.sign({
      data:{
        id: empleado.id,
        email: empleado.email,
        nombre: empleado.nombres + " " + empleado.apellidos,
        rol: "Empleado"
      }
    },
    Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string){
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch (error) {
      return false;
    }
  }

}

//npm i @loopback/authentication --force
//npm i @loopback/security --force