import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelCliente } from '../Modelos/cliente.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
url = "http://localhost:3000";
token: String = '';

  constructor(private http: HttpClient, private seguridadServicio: SeguridadService) {
    this.token = this.seguridadServicio.ObtenerToken();
  }
  
  ObtenerClientes():Observable<ModelCliente[]>{
    return this.http.get<ModelCliente[]>(`${this.url}/clientes`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
  
  ObtenerClientePorId(id: string):Observable<ModelCliente>{
    return this.http.get<ModelCliente>(`${this.url}/clientes/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
  CrearCliente(cliente: ModelCliente): Observable<ModelCliente>{
    return this.http.post<ModelCliente>(`${this.url}/clientes`,cliente,{
      headers: new HttpHeaders({
        'Autorization':`Bearer ${this.token}`
      })
    })
  }

  ActualizarCliente(cliente: ModelCliente): Observable<ModelCliente>{
    return this.http.put<ModelCliente>(`${this.url}/clientes/${cliente.id}`,cliente,{
      headers: new HttpHeaders({
        'Autorization':`Bearer ${this.token}`
      })
    })
  }  

  EliminarCliente(id: string): Observable<any>{
    return this.http.delete(`${this.url}/clientes/${id}`,{
      headers: new HttpHeaders({
        'Autorization':`Bearer ${this.token}`
      })
    })
  }
}
