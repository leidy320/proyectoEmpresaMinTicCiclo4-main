import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelProducto } from 'src/app/Modelos/producto.model';
import { ProductoService } from 'src/app/servicios/producto.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  id:string ="";
  fgValidador: FormGroup = this.fb.group({

    'nombre': ['', [Validators.required]],
    'valor': ['', [Validators.required, Validators.min(0)]],
    'descripcion': ['', [Validators.required]]
  }
  );
  
  constructor(private fb: FormBuilder, 
    private ServicioProducto: ProductoService,
    private router:Router,
    private parametro: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.parametro.snapshot.params["id"];
    this.BuscarProducto();
  }

  Editar(){
    let producto = new ModelProducto();
    producto.nombre = this.fgValidador.controls["nombre"].value;
    producto.valorUnitario = parseInt(this.fgValidador.controls["valor"].value);
    producto.descripcion = this.fgValidador.controls["descripcion"].value;
    producto.empresaId = "61a5745724a6402a80cbf33e";
    producto.id=this.id;
    this.ServicioProducto.ActualizarProducto(producto).subscribe((datos:ModelProducto)=>{
      swal("Producto actualizado correctamente", {
        icon: "success",
      });
      this.router.navigate(["/listar-producto"]);
    }, (error:any)=>{
      swal("Ocurrió un error al intentar actualizar el producto", {
        icon: "error",
      });
      console.log(error);
    });
  }
  BuscarProducto(){
    this.ServicioProducto.ObtenerProductoPorId(this.id).subscribe((datos: ModelProducto)=>{
      this.fgValidador.controls["nombre"].setValue(datos.nombre);
      this.fgValidador.controls["valor"].setValue(datos.valorUnitario);
      this.fgValidador.controls["descripcion"].setValue(datos.descripcion);
      this.fgValidador.controls["id"].setValue(this.id);
    });
  }
}
