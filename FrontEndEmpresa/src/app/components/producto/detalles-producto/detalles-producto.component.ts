import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelProducto } from 'src/app/Modelos/producto.model';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent implements OnInit {
  producto: ModelProducto = new ModelProducto();
  id:string = "";
  constructor(private ServicioProducto: ProductoService,
    private router:Router,
    private parametro: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.parametro.snapshot.params["id"];
    this.BuscarProducto();
  }
  BuscarProducto(){
    this.ServicioProducto.ObtenerProductoPorId(this.id).subscribe((datos: ModelProducto)=>{
      this.producto.nombre=datos.nombre;
      this.producto.valorUnitario=datos.valorUnitario;
      this.producto.descripcion=datos.descripcion;
    });
  }

}
