import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelProducto } from 'src/app/Modelos/producto.model';
import { ProductoService } from 'src/app/servicios/producto.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {

  listaProductos: ModelProducto[]=[];

  constructor(private productoServicio:ProductoService, private router: Router) { }

  ngOnInit(): void {
    this.ObtenerListaProductos();
  }

  ObtenerListaProductos(){
    this.productoServicio.ObtenerProductos().subscribe((datos: ModelProducto[])=>{
      this.listaProductos = datos;
    });
  }

  EliminarProducto(id: string){
    
    swal({
      title: "¿Desea eliminar el producto?",
      text: "Esta acción no se puede revertir.",
      icon: "warning",
      dangerMode: true,
      
    })
    .then((willDelete) => {
      if (willDelete) {
        this.productoServicio.EliminarProducto(id).subscribe((data:any)=>{
          this.listaProductos = this.listaProductos.filter(item => item.id != id);
          swal("Producto eliminado correctamente", {
            icon: "success",
          });

        },(error:any)=>{
          console.log(error);
          swal("Ocurrió un error al intentar eliminar el producto", {
            icon: "error",
          });
        });
      }
    });
    this.router.navigate(['/listar-producto']);
  }
}