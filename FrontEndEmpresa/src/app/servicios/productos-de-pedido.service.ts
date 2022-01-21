import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelProductosDePedido } from '../Modelos/productos-de-pedido.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosDePedidoService {

  token:string = "";
  url:string = 'http://localhost:3000';
  constructor(private http:HttpClient, private seguridadServicio: SeguridadService) { 
    this.token = seguridadServicio.ObtenerToken();
  }

  ObtenerProductoDePedido(id:string):Observable<ModelProductosDePedido[]>{
    return this.http.get<ModelProductosDePedido[]>(`${this.url}/productos-de-pedidos?filter[where][productoId]=${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  CrearProductoDePedido(producto:ModelProductosDePedido):Observable<ModelProductosDePedido>{
    return this.http.post<ModelProductosDePedido>(`${this.url}/productos-de-pedidos`, producto,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  ActualizarProductoDePedido(producto:ModelProductosDePedido):Observable<ModelProductosDePedido>{
    return this.http.put<ModelProductosDePedido>(`${this.url}/productos-de-pedidos`, producto,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  EliminarProductoDePedido(id: string):Observable<any>{
    return this.http.delete(`${this.url}/productos-de-pedidos/${id}`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
}
