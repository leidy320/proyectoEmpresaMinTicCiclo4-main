import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelPedido } from 'src/app/Modelos/pedido.model';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.css']
})
export class ListarPedidosComponent implements OnInit {
  idCliente:string="";
  listaPedidos: ModelPedido[] = [];
  constructor(private parametro: ActivatedRoute,
    private servicioPedido: PedidoService) { }

  ngOnInit(): void {
    this.idCliente = this.parametro.snapshot.params["id"];
    this.ObtenerPedidos();
  }
  ObtenerPedidos() {
    this.servicioPedido.ObtenerPedidoDeCliente(this.idCliente).subscribe((datos: ModelPedido[])=>{
      this.listaPedidos = datos;
    });
  }



}
