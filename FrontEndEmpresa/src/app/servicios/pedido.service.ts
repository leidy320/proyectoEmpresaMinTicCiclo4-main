import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelPedido } from '../Modelos/pedido.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  

  token:string = "";
  url:string = 'http://localhost:3000';
  constructor(private http:HttpClient, private seguridadServicio: SeguridadService) { 
    this.token = seguridadServicio.ObtenerToken();
  }

  ObtenerPedidoDeCliente(idCliente: string) {
    return this.http.get<ModelPedido[]>(`${this.url}/pedidos?filter[where][clienteId]=${idCliente}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  ObtenerPedido():Observable<ModelPedido[]>{
    return this.http.get<ModelPedido[]>(`${this.url}/pedidos`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  CrearPedido(pedido:ModelPedido):Observable<ModelPedido>{
    return this.http.post<ModelPedido>(`${this.url}/pedidos`, pedido,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  ActualizarPedido(pedido:ModelPedido):Observable<ModelPedido>{
    return this.http.put<ModelPedido>(`${this.url}/pedidos`, pedido,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  EliminarPedido(id: string):Observable<any>{
    return this.http.delete(`${this.url}/pedidos/${id}`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
}
