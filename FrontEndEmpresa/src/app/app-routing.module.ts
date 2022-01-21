import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AgregarEmpresaComponent } from './components/empresa/agregar-empresa/agregar-empresa.component';
import { DetallesEmpresaComponent } from './components/empresa/detalles-empresa/detalles-empresa.component';
import { EditarEmpresaComponent } from './components/empresa/editar-empresa/editar-empresa.component';
import { ListarEmpresaComponent } from './components/empresa/listar-empresa/listar-empresa.component';
import { AgregarEmpleadoComponent } from './components/empleado/agregar-empleado/agregarEmpleado.component';
import { DetallesEmpleadoComponent } from './components/empleado/detalles-empleado/detalles-empleado.component';
import { EditarEmpleadoComponent } from './components/empleado/editar-empleado/editar-empleado.component';
import { ListarEmpleadoComponent } from './components/empleado/listar-empleado/listar-empleado.component';
import { AgregarClienteComponent } from './components/cliente/agregar-cliente/agregar-cliente.component';
import { DetallesClienteComponent } from './components/cliente/detalles-cliente/detalles-cliente.component';
import { EditarClienteComponent } from './components/cliente/editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './components/cliente/listar-cliente/listar-cliente.component';
import { PerfilUsuarioComponent } from './components/perfiles/perfil-usuario/perfil-usuario.component';
import { AgregarProductoComponent } from './components/producto/agregar-producto/agregar-producto.component';
import { DetallesProductoComponent } from './components/producto/detalles-producto/detalles-producto.component';
import { EditarProductoComponent } from './components/producto/editar-producto/editar-producto.component';
import { ListarProductoComponent } from './components/producto/listar-producto/listar-producto.component';
import { ListarProductosDePedidoComponent } from './components/pedido/listar-productos-de-pedido/listar-productos-de-pedido.component';
import { ListarPedidosComponent } from './components/pedido/listar-pedidos/listar-pedidos.component';
import { AgregarPedidoComponent } from './components/pedido/agregar-pedido/agregar-pedido.component';

const routes: Routes = [
  { path: "", component: AppComponent, pathMatch: "full" },
  { path: "inicio", component: PerfilUsuarioComponent, pathMatch: "full" },
  { path: "agregar-empresa", component: AgregarEmpresaComponent, pathMatch: "full" },
  { path: "detalles-empresa/:id", component: DetallesEmpresaComponent, pathMatch: "full" },
  { path: "editar-empresa/:id", component: EditarEmpresaComponent, pathMatch: "full" },
  { path: "listar-empresa", component: ListarEmpresaComponent, pathMatch: "full" },
  { path: "agregar-empleado", component: AgregarEmpleadoComponent, pathMatch: "full" },
  { path: "detalles-empleado/:id", component: DetallesEmpleadoComponent, pathMatch: "full" },
  { path: "editar-empleado/:id", component: EditarEmpleadoComponent, pathMatch: "full" },
  { path: "listar-empleado", component: ListarEmpleadoComponent, pathMatch: "full" },
  { path: "agregar-cliente", component: AgregarClienteComponent, pathMatch: "full" },
  { path: "detalles-cliente/:id", component: DetallesClienteComponent, pathMatch: "full" },
  { path: "editar-cliente/:id", component: EditarClienteComponent, pathMatch: "full" },
  { path: "listar-cliente", component: ListarClienteComponent, pathMatch: "full" },
  { path: "agregar-producto", component: AgregarProductoComponent, pathMatch: "full" },
  { path: "detalles-producto/:id", component: DetallesProductoComponent, pathMatch: "full" },
  { path: "editar-producto/:id", component: EditarProductoComponent, pathMatch: "full" },
  { path: "listar-producto", component: ListarProductoComponent, pathMatch: "full" },
  { path: "listar-productos-pedido/:id", component: ListarProductosDePedidoComponent, pathMatch: "full" },
  { path: "listar-pedidos/:id", component: ListarPedidosComponent, pathMatch: "full" },
  { path: "agregar-pedido", component: AgregarPedidoComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

