import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelEmpresa } from 'src/app/Modelos/empresa.model';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-agregar-empresa',
  templateUrl: './agregar-empresa.component.html',
  styleUrls: ['./agregar-empresa.component.css']
})
export class AgregarEmpresaComponent implements OnInit {

agrEmpValidador: FormGroup = this.fb.group({
  'nit':['',[Validators.required]],
  'razonSocial': [Validators.required]
});

  nit: string;
  razonSocial: string;

  constructor(private fb: FormBuilder, public servicio: EmpresaService) {
    this.nit = "";
    this.razonSocial = "";
   }

  ngOnInit(): void {
  }

  agregar_empresa(){
    let empresa: ModelEmpresa;
    empresa = {
      nit: this.nit,
      razonSocial: this.razonSocial
    }
    this.servicio.CrearEmpresa(empresa);
    alert('Empresa agregada')
  }
}