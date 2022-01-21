import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CredencialesModel } from 'src/app/Modelos/credenciales.model';
import { ModelEmpleado } from 'src/app/Modelos/empleado.model';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.component.html',
  styleUrls: ['./perfil-empleado.component.css']
})
export class PerfilEmpleadoComponent implements OnInit {

  id:string ="";
  editar: boolean = false;
  esDirectivo: boolean = false;
  fgValidador: FormGroup = this.fb.group({
    'nombres': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'direccion': ['', [Validators.required]],
    'fechaNacimiento': ['', [Validators.required]],
    'telefono': ['', [Validators.required]],
    'correo': ['', [Validators.required, Validators.email]],
    'sueldo': ['', [Validators.required, Validators.min(0)]],
  }
  );
  subs: Subscription = new Subscription();
  constructor(private fb: FormBuilder, 
    private ServicioEmpleado: EmpleadoService,
    private router:Router,
    private servicioSeguridad: SeguridadService) { }

  ngOnInit(): void {
    this.subs = this.servicioSeguridad.ObtenerDatosUsuarioSesion().subscribe((datos:CredencialesModel)=>{
      this.id=datos.data?.id!;
    })
    this.fgValidador.disable();
    this.BuscarEmpleado();
  }
  BuscarEmpleado() {
    let fecha:Date = new Date();
    this.ServicioEmpleado.ObtenerEmpleadoPorId(this.id).subscribe((datos: ModelEmpleado)=>{
      this.fgValidador.controls["nombres"].setValue(datos.nombres);
      this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
      this.fgValidador.controls["direccion"].setValue(datos.direccion);
      this.fgValidador.controls["fechaNacimiento"].setValue(datos.fechaNacimiento?.toString());
      this.fgValidador.controls["telefono"].setValue(datos.telefono);
      this.fgValidador.controls["correo"].setValue(datos.email);
      this.fgValidador.controls["esDir"].setValue(datos.esDirectivo);
      this.fgValidador.controls["sueldo"].setValue(datos.sueldo);
      console.log(datos.fechaNacimiento);
    });
  }
  Editar(){
    this.editar=true;
    this.fgValidador.enable();
  }

  GuardarCambios(){
    //agregar logica de guardar
    let e = new ModelEmpleado();
    e.nombres = this.fgValidador.controls["nombres"].value;
    e.apellidos = this.fgValidador.controls["apellidos"].value;
    e.direccion = this.fgValidador.controls["direccion"].value;
    e.fechaNacimiento = this.fgValidador.controls["fechaNacimiento"].value;
    e.telefono = this.fgValidador.controls["telefono"].value;
    e.email = this.fgValidador.controls["correo"].value;
    e.sueldo = parseInt(this.fgValidador.controls["sueldo"].value);
    e.empresaId = "61a5745724a6402a80cbf33e";
    e.id=this.id;
    e.esDirectivo=this.fgValidador.controls["esDir"].value;
    this.ServicioEmpleado.ActualizarEmpleado(e).subscribe((datos:ModelEmpleado)=>{
      alert("Datos actualizados");
    }, (error:any)=>{
      alert("Ocurrio un error al actualizar");
      console.log(error);
    });
    this.editar=false;
    this.fgValidador.disable();
  }
  CancelarEditar(){
    this.editar=false;
    this.fgValidador.disable();
  }

}
