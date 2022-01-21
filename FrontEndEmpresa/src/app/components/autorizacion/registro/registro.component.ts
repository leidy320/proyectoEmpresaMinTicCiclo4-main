import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email: string;
  clave: string;
  nombres: string;
  apellidos: string;
  rol: string;
  confirmPassword: string;
  passwordError: boolean;

  constructor() { 
    this.email="";
    this.clave="";
    this.apellidos="";
    this.rol="";
    this.nombres="";
    this.confirmPassword="";
    this.passwordError=false;
  }

  ngOnInit(): void {
  }

  register(){
    console.log("Registrar");
  }

}
