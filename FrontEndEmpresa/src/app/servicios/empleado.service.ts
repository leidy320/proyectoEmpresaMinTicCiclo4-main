import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelEmpleado } from '../Modelos/empleado.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  token:string = "";
  url:string = 'http://localhost:3000';
  constructor(private http:HttpClient, private seguridadServicio: SeguridadService) { 
    this.token = seguridadServicio.ObtenerToken();
  }

  ObtenerEmpleados():Observable<ModelEmpleado[]>{
    return this.http.get<ModelEmpleado[]>(`${this.url}/empleados`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  CrearEmpleado(empleado:ModelEmpleado):Observable<ModelEmpleado>{
    return this.http.post<ModelEmpleado>(`${this.url}/empleados`, empleado,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  ActualizarEmpleado(empleado:ModelEmpleado):Observable<ModelEmpleado>{
    return this.http.put<ModelEmpleado>(`${this.url}/empleados`, empleado,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  EliminarEmpleado(id: string):Observable<any>{
    return this.http.delete(`${this.url}/empleados/${id}`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
  
  ObtenerEmpleadoPorId(id:string):Observable<ModelEmpleado>{
    return this.http.get<ModelEmpleado>(`${this.url}/empleados/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }
}
