import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelEmpleado } from 'src/app/Modelos/empleado.model';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {
  id:string ="";
  EmpleValidador: FormGroup = this.fb.group({

    'nombres':['',[Validators.required]],
    'apellidos':['',[Validators.required]],
    'telefono':['',[Validators.required]],
    'direccion':['',[Validators.required]],
    'email':['',[Validators.required]],
    'fechaNacimiento':['',[Validators.required]],
    'sueldo':['',[Validators.required]],
    'esDirectivo':['',[Validators.required]],
    'razonSocial':[Validators.required]
  }
  );
  
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  email: string;
  fechaNacimiento: Date;
  sueldo: number;
  esDirectivo: boolean;
  razonSocial: string;
  empresaId: string;

  constructor(private fb: FormBuilder, 
    private ServicioEmpleado: EmpleadoService,
    private router:Router,
    private parametro: ActivatedRoute) { 
      this.nombres = "";
      this.apellidos = "";
      this.telefono = "";
      this.direccion = "";
      this.email = "";
      this.fechaNacimiento = new Date();
      this.sueldo = 0;
      this.esDirectivo = false;
      this.razonSocial = "";
      this.empresaId="";  
    }

  ngOnInit(): void {
    this.id = this.parametro.snapshot.params["id"];
    this.BuscarEmpleado();
  }

  Editar(){
    let empleado = new ModelEmpleado();
    empleado.nombres = this.EmpleValidador.controls["nombres"].value;
    empleado.apellidos = this.EmpleValidador.controls["apellidos"].value;
    empleado.telefono = this.EmpleValidador.controls["telefono"].value;
    empleado.direccion = this.EmpleValidador.controls["direccion"].value;
    empleado.email = this.EmpleValidador.controls["email"].value;
    empleado.fechaNacimiento = this.EmpleValidador.controls["fechaNacimiento"].value;
    empleado.sueldo = parseInt(this.EmpleValidador.controls["sueldo"].value);
    empleado.esDirectivo = Boolean(this.EmpleValidador.controls["esDirectivo"].value);
    empleado.razonSocial = this.EmpleValidador.controls["razonSocial"].value;
    empleado.empresaId = "61a5745724a6402a80cbf33e";
    empleado.id=this.id;
    this.ServicioEmpleado.ActualizarEmpleado(empleado).subscribe((datos:ModelEmpleado)=>{
      swal("Empleado actualizado correctamente", {
        icon: "success",
      });
      this.router.navigate(["/listar-empleado"]);
    }, (error:any)=>{
      swal("Ocurrió un error al actualizar el empleado", {
        icon: "error",
      });
      console.log(error);
    });
  }
  BuscarEmpleado(){
    this.ServicioEmpleado.ObtenerEmpleadoPorId(this.id).subscribe((datos: ModelEmpleado)=>{
     
      this.EmpleValidador.controls["nombres"].setValue(datos.nombres);
      this.EmpleValidador.controls["apellidos"].setValue(datos.apellidos);
      this.EmpleValidador.controls["telefono"].setValue(datos.telefono);
       this.EmpleValidador.controls["direccion"].setValue(datos.direccion);
      this.EmpleValidador.controls["email"].setValue(datos.email);
      this.EmpleValidador.controls["fechaNacimiento"].setValue(datos.fechaNacimiento);
      this.EmpleValidador.controls["sueldo"].setValue(datos.sueldo);
      this.EmpleValidador.controls["esDirectivo"].setValue(datos.esDirectivo);
      this.EmpleValidador.controls["razonSocial"].setValue(datos.razonSocial);
      this.EmpleValidador.controls["empresaId"].setValue(datos.empresaId);
      this.EmpleValidador.controls["id"].setValue(this.id);
    });
  }
}
