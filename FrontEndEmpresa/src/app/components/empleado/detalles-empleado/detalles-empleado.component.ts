import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelEmpleado } from 'src/app/Modelos/empleado.model';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-detalles-empleado',
  templateUrl: './detalles-empleado.component.html',
  styleUrls: ['./detalles-empleado.component.css']
})
export class DetallesEmpleadoComponent implements OnInit {

  empleado: ModelEmpleado = new ModelEmpleado() ;
  id:string = "";
  constructor(private ServicioEmpleado: EmpleadoService,
    private router:Router,
    private parametro: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.parametro.snapshot.params["id"];
    this.BuscarEmpleado();
  }
  BuscarEmpleado(){
    this.ServicioEmpleado.ObtenerEmpleadoPorId(this.id).subscribe((datos: ModelEmpleado)=>{
    
      this.empleado.nombres=datos.nombres;
      this.empleado.apellidos=datos.apellidos;
      this.empleado.telefono=datos.telefono;
      this.empleado.direccion=datos.direccion;
      this.empleado.email=datos.email;
      this.empleado.fechaNacimiento=datos.fechaNacimiento;
      this.empleado.sueldo=datos.sueldo;
      this.empleado.esDirectivo=datos.esDirectivo;
      this.empleado.razonSocial=datos.razonSocial;
      this.empleado.empresaId=datos.empresaId;
     
    });
  }
}
