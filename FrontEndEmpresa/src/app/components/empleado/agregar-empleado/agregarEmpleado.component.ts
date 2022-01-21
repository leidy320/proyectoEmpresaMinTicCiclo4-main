import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelEmpleado } from 'src/app/Modelos/empleado.model';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregarEmpleado.component.html',
  styleUrls: ['./agregarEmpleado.component.css']
})
export class AgregarEmpleadoComponent implements OnInit {

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
  });


  listaEmpresas: string[] = ["prueba 1", "prueba 2", "prueba 3"];

  constructor(private fb: FormBuilder, 
    private ServicioEmpleado: EmpleadoService,
    private router:Router) { }


  ngOnInit(): void {
  }

  Agregar(){
    let empleado = new ModelEmpleado();
    empleado.nombres = this.EmpleValidador.controls["nombres"].value;
    empleado.apellidos = this.EmpleValidador.controls["apellidos"].value;
    empleado.telefono = this.EmpleValidador.controls["telefono"].value;
    empleado.direccion = this.EmpleValidador.controls["direccion"].value;
    empleado.email = this.EmpleValidador.controls["email"].value;
    empleado.fechaNacimiento = new Date(this.EmpleValidador.controls["fechaNacimiento"].value);
    empleado.sueldo = parseInt(this.EmpleValidador.controls["sueldo"].value);
    empleado.esDirectivo = Boolean(this.EmpleValidador.controls["esDirectivo"].value);
    empleado.razonSocial = this.EmpleValidador.controls["razonSocial"].value;
    empleado.empresaId = "61a5745724a6402a80cbf33e";
    empleado.clave = "";
    this.ServicioEmpleado.CrearEmpleado(empleado).subscribe((datos:ModelEmpleado)=>{
      swal("Empleado almacenado correctamente", {
        icon: "success",
      });
      this.router.navigate(["/listar-empleado"]);
    }, (error:any)=>{
      swal("Ocurrió un error al almacenar el empleado", {
        icon: "error",
      });
      console.log(error);
    });
  }

}
