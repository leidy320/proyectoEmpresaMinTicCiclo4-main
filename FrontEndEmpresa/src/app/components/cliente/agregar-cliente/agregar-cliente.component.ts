import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelCliente } from 'src/app/Modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'nombres': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'telefono': ['', [Validators.required]],
    'direccion': ['', [Validators.required]],
    'email': ['', [Validators.required]],
    'fechaNacimiento': ['', [Validators.required]],
    'razonSocial': ['', [Validators.required]]
    
  })

  nombres: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  email: string;
  fechaNacimiento: Date;
  empresaId: string;
  listaEmpresas: string[] = ["prueba 1", "prueba 2", "prueba 3"];

  constructor(private fb: FormBuilder,
    private servicioCliente: ClienteService,
    private router: Router) {
    this.nombres="";
    this.apellidos="";
    this.telefono="";
    this.direccion="";
    this.email="";
    this.fechaNacimiento=new Date();
    this.empresaId="";  
   }

  ngOnInit(): void {
  }
  AgregarCliente(){
    let nombres = this.fgValidador.controls["nombres"].value;
    let apellidos = this.fgValidador.controls["apellidos"].value;
    let telefono = this.fgValidador.controls["telefono"].value;
    let direccion = this.fgValidador.controls["direccion"].value;
    let email = this.fgValidador.controls["email"].value;
    let fechaNacimiento = this.fgValidador.controls["fechaNacimiento"].value;
    let empresaId = "61a5745724a6402a80cbf33e";

    let c = new ModelCliente();
    c.nombres = nombres;
    c.apellidos = apellidos;
    c.telefono = telefono;
    c.direccion = direccion;
    c.email = email;
    c.fechaNacimiento = new Date(fechaNacimiento);
    c.empresaId = empresaId;

    this.servicioCliente.CrearCliente(c).subscribe((datos: ModelCliente) => {
      swal("Cliente agregado correctamente", {
        icon: "success",
      });
      this.router.navigate(["/listar-cliente"]);
    }, (error:any) => {
      swal("Error agregando cliente", {
        icon: "error",
      });
      console.log(error)
    });

    console.log("Agregar cliente");
  }
  Volver(){
    console.log("Volver a agregar cliente");
  }

}
