import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModelCliente } from 'src/app/Modelos/cliente.model';
import { CredencialesModel } from 'src/app/Modelos/credenciales.model';
import { ModelEmpleado } from 'src/app/Modelos/empleado.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as CryptoJS from "crypto-js";

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'claveActual': ['', [Validators.required]],
    'claveNueva': ['', [Validators.required]]
  }
  );
  
  subs: Subscription = new Subscription();

  constructor(private fb: FormBuilder, 
    private ServicioSeguridad: SeguridadService,
    private ServicioCliente: ClienteService,
    private ServicioEmpleado: EmpleadoService) { }

  ngOnInit(): void {
    this.fb.group({
      'claveActual': [''],
      'claveNueva': ['']
    }
    );
  }

  Cambiar(){
    this.subs = this.ServicioSeguridad.ObtenerDatosUsuarioSesion().subscribe((datos:CredencialesModel)=>{
      if(datos.identificado){
        if(datos.rol=="Empleado"){
          this.CambiarClaveEmpleado(datos.data?.email!);
        }
        if(datos.rol=="Cliente"){
          this.CambiarClaveCliente(datos.data?.email!);
        }
      }
    });
  }

  CambiarClaveCliente(usuario:string){
    //comparar con la clave actual del input
    let claveActualCifrada = CryptoJS.MD5(this.fgValidador.controls["claveActual"].value).toString();
    this.ServicioSeguridad.IdentificarCliente(usuario, claveActualCifrada).subscribe((datos:CredencialesModel)=>{
      //es valida
      console.log("cliente identificado");
      this.ServicioCliente.ObtenerClientePorId(datos.data?.id!).subscribe((cliente:ModelCliente)=>{
        console.log("cliente obtenido");
        let claveCifrada = CryptoJS.MD5(this.fgValidador.controls["claveNueva"].value).toString();
        cliente.clave=claveCifrada;
        console.log("antes de actualizar");
        this.ServicioCliente.ActualizarCliente(cliente);
        alert("La contraseña se cambio satisfactoriamente");
      });
    },(error:any)=>{
      console.log("error");
      alert("La contraseña actual no coincide ")
    });
    this.fgValidador.controls["claveActual"].setValue("");
    this.fgValidador.controls["claveNueva"].setValue("");
  }

  CambiarClaveEmpleado(usuario:string){
    let claveActualCifrada = CryptoJS.MD5(this.fgValidador.controls["claveActual"].value).toString();
    this.ServicioSeguridad.IdentificarEmpleado(usuario, claveActualCifrada).subscribe((datos:CredencialesModel)=>{
      //es valida
      this.ServicioEmpleado.ObtenerEmpleadoPorId(datos.data?.id!).subscribe((empleado:ModelEmpleado)=>{
        let claveCifrada = CryptoJS.MD5(this.fgValidador.controls["claveNueva"].value).toString();
        empleado.clave=claveCifrada;
        this.ServicioEmpleado.ActualizarEmpleado(empleado);
      });
    },(error:any)=>{
      alert("La contraseña actual no coincide ")
    });
    this.fgValidador.controls["claveActual"].setValue("");
    this.fgValidador.controls["claveNueva"].setValue("");
  }

}
