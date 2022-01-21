import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelMensajeEmpleado } from '../Modelos/mensaje-empleado.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class MensajesEmpleadoService {

  token:string = "";
  url:string = 'http://localhost:3000';
  constructor(private http:HttpClient, private seguridadServicio: SeguridadService) { 
    this.token = seguridadServicio.ObtenerToken();
  }

  ObtenerMensajesDeEmpleado(id:string):Observable<ModelMensajeEmpleado[]>{
    return this.http.get<ModelMensajeEmpleado[]>(`${this.url}/mensaje-empleados?filter[where][empleadoId]=${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  CrearMensajeDeEmpleado(mensaje:ModelMensajeEmpleado):Observable<ModelMensajeEmpleado>{
    return this.http.post<ModelMensajeEmpleado>(`${this.url}/mensaje-empleados`, mensaje,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  ActualizarMensajeDeEmpleado(mensaje:ModelMensajeEmpleado):Observable<ModelMensajeEmpleado>{
    return this.http.put<ModelMensajeEmpleado>(`${this.url}/mensaje-empleados`, mensaje,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  EliminarMensajeDeEmpleado(id: string):Observable<any>{
    return this.http.delete(`${this.url}/mensaje-empleados/${id}`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
}
