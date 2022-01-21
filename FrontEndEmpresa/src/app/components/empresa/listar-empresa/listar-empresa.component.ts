import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-listar-empresa',
  templateUrl: './listar-empresa.component.html',
  styleUrls: ['./listar-empresa.component.css']
})
export class ListarEmpresaComponent implements OnInit {

  empresas: any;

  constructor(public servicio: EmpresaService) { 

  }

  ngOnInit(): void {
    this.servicio.ObtenerEmpresas().subscribe(
      data => {
        this.empresas = data;
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Error en el cliente.");
        } else {
          console.log("Error en el servidor.");
        }
      }
    );
  }

}
