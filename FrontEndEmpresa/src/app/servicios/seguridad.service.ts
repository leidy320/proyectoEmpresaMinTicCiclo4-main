import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CredencialesModel } from '../Modelos/credenciales.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  urlBack: string ="http://localhost:3000";
  datosUsuarioSesion = new BehaviorSubject<CredencialesModel>(new CredencialesModel());

  constructor(private Http: HttpClient) { 
    this.VerificarSesionActual();
  }

  IdentificarCliente(usuario: string, password: string): Observable<CredencialesModel>{
    return this.Http.post<CredencialesModel>(this.urlBack + '/identificarCliente',{
      usuario: usuario,
      clave: password
    })
  }
  IdentificarEmpleado(usuario: string, password: string): Observable<CredencialesModel>{
    return this.Http.post<CredencialesModel>(this.urlBack + '/identificarEmpleado',{
      usuario: usuario,
      clave: password
    })
  }
  AlmacenarSesion(datos:CredencialesModel){
    datos.identificado = true;
    let stringDatos = JSON.stringify(datos);
    localStorage.setItem("datosSesion", stringDatos);
    this.RefrescarDatosSesion(datos);
  }
  ObtenerInfoSesion(){
    let stringDatos = localStorage.getItem("datosSesion");
    if(stringDatos){
      let datos = JSON.parse(stringDatos);
      return datos;
    }
    return null;
  }
  ObtenerDatosUsuarioSesion(){
    return this.datosUsuarioSesion.asObservable();
  }
  EliminarInfoSesion(){
    localStorage.removeItem("datosSesion");
    this.RefrescarDatosSesion(new CredencialesModel());
  }

  SesionIciada(){
    let stringDatos = localStorage.getItem("datosSesion");
    return stringDatos;
  }
  VerificarSesionActual(){
    let datos = this.ObtenerInfoSesion();
    if(datos){
      this.RefrescarDatosSesion(datos);
    }
  }
  RefrescarDatosSesion(datos:CredencialesModel){
    this.datosUsuarioSesion.next(datos);
  }
  ObtenerToken(){
    let stringDatos = localStorage.getItem("datosSesion");
    if(stringDatos){
      let datos = JSON.parse(stringDatos);
      return datos.tk;
    }
    return "";
  }
}
