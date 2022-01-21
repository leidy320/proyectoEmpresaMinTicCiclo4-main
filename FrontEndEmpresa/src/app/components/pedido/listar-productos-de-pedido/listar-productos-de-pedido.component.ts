import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelProducto } from 'src/app/Modelos/producto.model';
import { ModelProductosDePedido } from 'src/app/Modelos/productos-de-pedido.model';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ProductosDePedidoService } from 'src/app/servicios/productos-de-pedido.service';

@Component({
  selector: 'app-listar-productos-de-pedido',
  templateUrl: './listar-productos-de-pedido.component.html',
  styleUrls: ['./listar-productos-de-pedido.component.css']
})
export class ListarProductosDePedidoComponent implements OnInit {

  id:string = "";
  listaProductosDePedido: ModelProductosDePedido[] = [];

  constructor(private parametro: ActivatedRoute,
    private servicioProducto: ProductoService,
    private servicioProductosDePedido: ProductosDePedidoService) { }

  ngOnInit(): void {
    this.id = this.parametro.snapshot.params["id"];
    this.ObtenerProductosDePedido();
  }

  ObtenerProductosDePedido(){
    this.servicioProductosDePedido.ObtenerProductoDePedido(this.id).subscribe((datos: ModelProductosDePedido[])=>{
      this.listaProductosDePedido = datos;
    });
  }

  ObtenerProductoPorId(id:string):ModelProducto{
    this.servicioProducto.ObtenerProductoPorId(id).subscribe((datos:ModelProducto)=>{
      return datos;
    });
    return new ModelProducto();
  }

  ObtenerNombreProducto(id:string):string{
    this.servicioProducto.ObtenerProductoPorId(id).subscribe((datos:ModelProducto)=>{
      return datos.nombre;
    });
    return "";
  }

  ObtenerValorProducto(id:string):number{
    this.servicioProducto.ObtenerProductoPorId(id).subscribe((datos:ModelProducto)=>{
      return datos.valorUnitario;
    });
    return 0;
  }

}
