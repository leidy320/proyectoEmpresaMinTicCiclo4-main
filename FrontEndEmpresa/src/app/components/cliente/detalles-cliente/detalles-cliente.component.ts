import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelCliente } from 'src/app/Modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-detalles-cliente',
  templateUrl: './detalles-cliente.component.html',
  styleUrls: ['./detalles-cliente.component.css']
})
export class DetallesClienteComponent implements OnInit {

  cliente: ModelCliente = new ModelCliente();
  id:string = "";
  constructor(private ServicioCliente: ClienteService,
    private router:Router,
    private parametro: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.parametro.snapshot.params["id"];
    this.BuscarCliente();
  }
  BuscarCliente(){
    this.ServicioCliente.ObtenerClientePorId(this.id).subscribe((datos: ModelCliente)=>{
      this.cliente.nombres=datos.nombres;
      this.cliente.apellidos=datos.apellidos;
      this.cliente.telefono=datos.telefono;
      this.cliente.direccion=datos.direccion;
      this.cliente.email=datos.email;
      this.cliente.fechaNacimiento=datos.fechaNacimiento;
      this.cliente.empresaId=datos.empresaId;
    });
  }

}
