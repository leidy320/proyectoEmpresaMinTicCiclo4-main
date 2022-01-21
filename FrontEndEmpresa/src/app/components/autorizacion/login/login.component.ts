import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as CryptoJS from "crypto-js";
import { CredencialesModel } from 'src/app/Modelos/credenciales.model';
//const CryptoJS = require('cryptojs');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required]]
  }
  );

  constructor(private fb: FormBuilder, 
    private ServicioSeguridad: SeguridadService) {

   }

  ngOnInit(): void {
    
  }

  login() {
    let usuario = this.fgValidador.controls['email'].value;
    let clave = this.fgValidador.controls['password'].value;
    //alert("usuario: "+usuario+"\n"+"Password: "+clave);
    let claveCifrada = CryptoJS.MD5(clave).toString();
    this.ServicioSeguridad.IdentificarEmpleado(usuario, claveCifrada).subscribe((datos:CredencialesModel)=>{
      //es empleado
      console.log("Es empleado");
      datos.rol="Empleado";
      console.log(datos);
      this.ServicioSeguridad.AlmacenarSesion(datos);
    },(error:any)=>{
      //no es empleado
      console.log("No es empleado");
      this.ServicioSeguridad.IdentificarCliente(usuario, claveCifrada).subscribe((datos:CredencialesModel)=>{
        console.log("Es cliente");
        datos.rol="Cliente";
        console.log(datos);
        this.ServicioSeguridad.AlmacenarSesion(datos);
      }, (error:any)=>{
        console.log("No es cliente");
        alert("Usuario o contraseña no encontrados");
      });
    });
  }

}
