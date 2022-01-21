import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CredencialesModel } from 'src/app/Modelos/credenciales.model';
import { ModelMensajeCliente } from 'src/app/Modelos/mensaje-cliente.model';
import { ModelMensajeEmpleado } from 'src/app/Modelos/mensaje-empleado.model';
import { MensajesClienteService } from 'src/app/servicios/mensajes-cliente.service';
import { MensajesEmpleadoService } from 'src/app/servicios/mensajes-empleado.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-mensajes-usuario',
  templateUrl: './mensajes-usuario.component.html',
  styleUrls: ['./mensajes-usuario.component.css']
})
export class MensajesUsuarioComponent implements OnInit {

  subs: Subscription = new Subscription();
  
  listaMensajesCliente: ModelMensajeCliente[]=[];
  listaMensajesEmpleado: ModelMensajeEmpleado[]=[];

  idUsuario:string="";
  rol:string="";

  constructor(private servicioSeguridad: SeguridadService,
    private servicioMsgCliente: MensajesClienteService,
    private servicioMsgEpleado: MensajesEmpleadoService) { }

  ngOnInit(): void {
    this.subs = this.servicioSeguridad.ObtenerDatosUsuarioSesion().subscribe((datos:CredencialesModel)=>{
      this.idUsuario = datos.data?.id!;
      this.rol=datos.rol;
    });
    if(this.rol=="Cliente"){
     //llenar la lista de los mensajes cliente
     this.servicioMsgCliente.ObtenerMensajesDeCliente(this.idUsuario).subscribe((datos: ModelMensajeCliente[])=>{
      this.listaMensajesCliente = datos;
     });
     return;
    }
    if(this.rol=="Empleado"){
      //lenar la lista de los menasajes empleado
      this.servicioMsgEpleado.ObtenerMensajesDeEmpleado(this.idUsuario).subscribe((datos: ModelMensajeEmpleado[])=>{
        this.listaMensajesEmpleado = datos;
       });
      return;
    }
  }

}
