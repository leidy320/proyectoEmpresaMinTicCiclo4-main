import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelMensajeCliente } from '../Modelos/mensaje-cliente.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class MensajesClienteService {

  token:string = "";
  url:string = 'http://localhost:3000';
  constructor(private http:HttpClient, private seguridadServicio: SeguridadService) { 
    this.token = seguridadServicio.ObtenerToken();
  }

  ObtenerMensajesDeCliente(id: string):Observable<ModelMensajeCliente[]>{
    return this.http.get<ModelMensajeCliente[]>(`${this.url}/mensaje-clientes?filter[where][clienteId]=${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  CrearMensajeDeCliente(mensaje:ModelMensajeCliente):Observable<ModelMensajeCliente>{
    return this.http.post<ModelMensajeCliente>(`${this.url}/mensaje-clientes`, mensaje,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  ActualizarMensajeDeCliente(mensaje:ModelMensajeCliente):Observable<ModelMensajeCliente>{
    return this.http.put<ModelMensajeCliente>(`${this.url}/mensaje-clientes`, mensaje,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  EliminarMensajeDeCliente(id: string):Observable<any>{
    return this.http.delete(`${this.url}/mensaje-clientes/${id}`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
}
