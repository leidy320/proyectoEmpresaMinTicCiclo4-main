import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelProducto } from 'src/app/Modelos/producto.model';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.component.html',
  styleUrls: ['./agregar-pedido.component.css']
})
export class AgregarPedidoComponent implements OnInit {

  listaProductos: ModelProducto[]=[];

  fgValidador: FormGroup = this.fb.group({
    'nombre': ['', [Validators.required]],
    'valor': ['', [Validators.required, Validators.min(0)]],
    'descripcion': ['', [Validators.required]]
  }
  );
  
  constructor(private fb: FormBuilder, 
    private ServicioPedido: PedidoService,
    private ServicioProducto: ProductoService,
    private router:Router) { }

  ngOnInit(): void {
  }

  Agregar(){

  }

}
