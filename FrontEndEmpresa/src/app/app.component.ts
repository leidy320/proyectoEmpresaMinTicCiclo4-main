import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CredencialesModel } from './Modelos/credenciales.model';
import { SeguridadService } from './servicios/seguridad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'APP Empresa';
  subs: Subscription = new Subscription();
  rol?:string;
  sesionIniciada:boolean = false;
  constructor(private servicioSeguridad: SeguridadService,
    private router: Router){  
  }
  ngOnInit():void{
    this.subs = this.servicioSeguridad.ObtenerDatosUsuarioSesion().subscribe((datos:CredencialesModel)=>{
      this.sesionIniciada = datos.identificado;
      this.rol=datos.rol;
    })
    this.router.navigate(['/inicio']);
  }
}
