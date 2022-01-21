import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-detalles-empresa',
  templateUrl: './detalles-empresa.component.html',
  styleUrls: ['./detalles-empresa.component.css']
})
export class DetallesEmpresaComponent implements OnInit {

  empresas: any;
  nit: string;
  razonSocial: string;
  id: any;

  constructor(public servicio: EmpresaService, private _route: ActivatedRoute) {
    this.nit = "";
    this.razonSocial = "";
   }

  ngOnInit(): void {

    this.id = this._route.snapshot.paramMap.get('id');
    this.servicio.ObtenerEmpresaPorID(this.id).subscribe(

      data => {
        this.empresas = data;
        this.nit = this.empresas.nit
        this.razonSocial = this.empresas.razonSocial
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          alert("Error en el cliente: " + err.message)
        } else {
          alert("Error en el servidor: " + err.message)
        }
      }
    );
  }
}