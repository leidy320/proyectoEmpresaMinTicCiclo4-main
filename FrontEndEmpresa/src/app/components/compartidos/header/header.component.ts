import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CredencialesModel } from 'src/app/Modelos/credenciales.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  subs: Subscription = new Subscription();
  usuario?: string;
  rol?: string;
  constructor(private servicioSeguridad: SeguridadService) { 
  }

  ngOnInit(): void {
    this.subs = this.servicioSeguridad.ObtenerDatosUsuarioSesion().subscribe((datos:CredencialesModel)=>{
      console.log(datos);
      this.rol = datos.rol;
      this.usuario = datos.data?.email;
    })
  }
  
  logout(){
    this.servicioSeguridad.EliminarInfoSesion();
  }

}
