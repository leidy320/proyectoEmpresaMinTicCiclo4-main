import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelCliente } from 'src/app/Modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  id: string ='';
  fgValidador: FormGroup = this.fb.group({

    'id': ['', [Validators.required]],
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
    private router: Router,
    private route: ActivatedRoute) {
    this.nombres="";
    this.apellidos="";
    this.telefono="";
    this.direccion="";
    this.email="";
    this.fechaNacimiento=new Date();
    this.empresaId="";  
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarCliente();
  }

  BuscarCliente(){
    this.servicioCliente.ObtenerClientePorId(this.id).subscribe((datos: ModelCliente) => {
      this.fgValidador.controls["nombres"].setValue(datos.nombres);
      this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
      this.fgValidador.controls["telefono"].setValue(datos.telefono);
      this.fgValidador.controls["direccion"].setValue(datos.direccion);
      this.fgValidador.controls["email"].setValue(datos.email);
      this.fgValidador.controls["fechaNacimiento"].setValue(datos.fechaNacimiento);
      this.fgValidador.controls["empresaId"].setValue(datos.empresaId);
    })
  }

  EditarCliente(){
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
    c.id = this.id;

    this.servicioCliente.ActualizarCliente(c).subscribe((datos: ModelCliente) => {
      swal("Cliente actualizado correctamente", {
        icon: "success",
      });
      this.router.navigate(["/listar-cliente"]);
    }, (error:any) => {
      swal("Error actualizando cliente", {
        icon: "error",
      });
      console.log(error)
    });

    console.log("Actualizar cliente");
  }
  Volver(){
    console.log("Volver a Actualizar cliente");
  }

}
