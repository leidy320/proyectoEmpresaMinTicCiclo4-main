import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  editar: boolean = false;
  cantidadPedidos:number=0;
  fgValidador: FormGroup = this.fb.group({
    'nombres': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'direccion': ['', [Validators.required]],
    'fechaNacimiento': ['', [Validators.required]],
    'telefono': ['', [Validators.required]],
    'correo': ['', [Validators.required, Validators.email]],
  }
  );
  subs: Subscription = new Subscription();
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  Editar(){
    this.editar=true;
  }

  GuardarCambios(){
    //agregar logica de guardar
    this.editar=false;
  }
  CancelarEditar(){
    this.editar=false;
  }

}
