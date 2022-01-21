import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CredencialesModel } from 'src/app/Modelos/credenciales.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styleUrls: ['./menu-cliente.component.css']
})
export class MenuClienteComponent implements OnInit {

  subs: Subscription = new Subscription();
  idCliente?: string;
  
  constructor(private servicioSeguridad: SeguridadService) { }

  ngOnInit(): void {
    this.subs = this.servicioSeguridad.ObtenerDatosUsuarioSesion().subscribe((datos:CredencialesModel)=>{
      console.log(datos);
      this.idCliente = datos.data?.id;
    })
  }
  
}
