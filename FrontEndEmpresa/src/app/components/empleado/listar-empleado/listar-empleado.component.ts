import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelEmpleado } from 'src/app/Modelos/empleado.model';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent implements OnInit {

  listaEmpleados: ModelEmpleado[]=[];

  constructor(private empleadoServicio:EmpleadoService, private router: Router) { }

  ngOnInit(): void {
    this.ObtenerListaEmpleados();
  }

  ObtenerListaEmpleados(){
    this.empleadoServicio.ObtenerEmpleados().subscribe((datos: ModelEmpleado[])=>{
      this.listaEmpleados = datos;
    });
  }

  EliminarEmpleado(id: string){
    
    swal({
      title: "¿Desea eliminar el empleado?",
      text: "Esta acción no se puede revertir.",
      icon: "warning",
      dangerMode: true,
      
    })
    .then((willDelete) => {
      if (willDelete) {
        
        this.empleadoServicio.EliminarEmpleado(id).subscribe((data:any)=>{
          swal("El empleado fue eliminado correctamente", {
            icon: "success",
          });
        },(error:any)=>{
          swal("Ocurrió un error al intentar eliminar el empleado", {
            icon: "error",
          });
        });
        this.router.navigate(['inicio']);
      }
    }); 
  }
}