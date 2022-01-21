import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ModelCliente } from 'src/app/Modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})

export class ListarClienteComponent implements OnInit {

  listadoCliente: ModelCliente[] = [];

  constructor(private clienteServicio: ClienteService,
    private router:Router) { }

  ngOnInit(): void {
    this.ObtenerListadocliente();
  }

  ObtenerListadocliente(){
    this.clienteServicio.ObtenerClientes().subscribe((datos: ModelCliente[]) => {
      this.listadoCliente = datos;
    })
  }

  EliminarCliente(id: string){

    
    swal({
      title: "¿Desea eliminar el cliente?",
      text: "Esta acción no se puede revertir.",
      icon: "warning",
      dangerMode: true,
      
    })
    .then((willDelete) => {
      if (willDelete) {
        this.clienteServicio.EliminarCliente(id).subscribe((data:any)=>{
          //alert("El Cliente fue eliminado correctamente");
          swal("El cliente fue eliminado correctamente", {
            icon: "success",
          });
        },(error:any)=>{
          console.log(error);
          //alert("Error al eliminar el cliente");
          swal("Error al eliminar el cliente", {
            icon: "error",
          });
        });
      }
    });

    
    // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: false }).then(() => {
    //   this.router.navigate(['/listar-cliente']);
    // });
    //this.router.navigate(['/listar-cliente']);
    this.ngOnInit();
    //this.ObtenerListadocliente();
  }

}
