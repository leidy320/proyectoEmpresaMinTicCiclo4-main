import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelProducto } from '../Modelos/producto.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  token:string = "";
  url:string = 'http://localhost:3000';
  constructor(private http:HttpClient, private seguridadServicio: SeguridadService) { 
    this.token = seguridadServicio.ObtenerToken();
  }

  ObtenerProductos():Observable<ModelProducto[]>{
    return this.http.get<ModelProducto[]>(`${this.url}/productos`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  ObtenerProductoPorId(id:string):Observable<ModelProducto>{
    return this.http.get<ModelProducto>(`${this.url}/productos/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  CrearProducto(producto:ModelProducto):Observable<ModelProducto>{
    return this.http.post<ModelProducto>(`${this.url}/productos`, producto,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  ActualizarProducto(producto:ModelProducto):Observable<ModelProducto>{
    return this.http.put<ModelProducto>(`${this.url}/productos/${producto.id}`, producto,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  EliminarProducto(id: string):Observable<any>{
    return this.http.delete(`${this.url}/productos/${id}`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
}
