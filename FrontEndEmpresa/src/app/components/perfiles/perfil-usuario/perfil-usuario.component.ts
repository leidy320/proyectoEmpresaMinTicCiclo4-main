import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CredencialesModel } from 'src/app/Modelos/credenciales.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  nombreUsuario ?: string;
  rol?:string;
  subs: Subscription = new Subscription();
  constructor(private servicioSeguridad: SeguridadService) { }

  ngOnInit(): void {
    this.subs = this.servicioSeguridad.ObtenerDatosUsuarioSesion().subscribe((datos:CredencialesModel)=>{
      this.nombreUsuario = datos.data?.nombres + " " + datos.data?.apellidos;
      this.rol=datos.rol;
    })
  }

}
