import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/autorizacion/login/login.component';
import { RegistroComponent } from './components/autorizacion/registro/registro.component';
import { LoginRegistroComponent } from './components/autorizacion/login-registro/login-registro.component';
import { AgregarEmpleadoComponent } from './components/empleado/agregar-empleado/agregarEmpleado.component';
import { DetallesEmpleadoComponent } from './components/empleado/detalles-empleado/detalles-empleado.component';
import { ListarEmpleadoComponent } from './components/empleado/listar-empleado/listar-empleado.component';
import { EditarEmpleadoComponent } from './components/empleado/editar-empleado/editar-empleado.component';
import { DetallesEmpresaComponent } from './components/empresa/detalles-empresa/detalles-empresa.component';
import { ListarEmpresaComponent } from './components/empresa/listar-empresa/listar-empresa.component';
import { AgregarEmpresaComponent } from './components/empresa/agregar-empresa/agregar-empresa.component';
import { EditarEmpresaComponent } from './components/empresa/editar-empresa/editar-empresa.component';
import { AgregarClienteComponent } from './components/cliente/agregar-cliente/agregar-cliente.component';
import { EditarClienteComponent } from './components/cliente/editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './components/cliente/listar-cliente/listar-cliente.component';
import { DetallesClienteComponent } from './components/cliente/detalles-cliente/detalles-cliente.component';
import { FooterComponent } from './components/compartidos/footer/footer.component';
import { HeaderComponent } from './components/compartidos/header/header.component';
import { MenuClienteComponent } from './components/compartidos/menu-cliente/menu-cliente.component';
import { MenuEmpleadoComponent } from './components/compartidos/menu-empleado/menu-empleado.component';
import { PerfilClienteComponent } from './components/perfiles/perfil-cliente/perfil-cliente.component';
import { PerfilEmpleadoComponent } from './components/perfiles/perfil-empleado/perfil-empleado.component';
import { PerfilUsuarioComponent } from './components/perfiles/perfil-usuario/perfil-usuario.component';
import { CambiarClaveComponent } from './components/autorizacion/cambiar-clave/cambiar-clave.component';
import { MensajesUsuarioComponent } from './components/perfiles/mensajes-usuario/mensajes-usuario.component';
import { AgregarProductoComponent } from './components/producto/agregar-producto/agregar-producto.component';
import { DetallesProductoComponent } from './components/producto/detalles-producto/detalles-producto.component';
import { ListarProductoComponent } from './components/producto/listar-producto/listar-producto.component';
import { EditarProductoComponent } from './components/producto/editar-producto/editar-producto.component';
import { AgregarPedidoComponent } from './components/pedido/agregar-pedido/agregar-pedido.component';
import { ListarPedidosComponent } from './components/pedido/listar-pedidos/listar-pedidos.component';
import { ListarProductosDePedidoComponent } from './components/pedido/listar-productos-de-pedido/listar-productos-de-pedido.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    LoginRegistroComponent,
    AgregarEmpleadoComponent,
    DetallesEmpleadoComponent,
    ListarEmpleadoComponent,
    EditarEmpleadoComponent,
    DetallesEmpresaComponent,
    ListarEmpresaComponent,
    AgregarEmpresaComponent,
    EditarEmpresaComponent,
    AgregarClienteComponent,
    EditarClienteComponent,
    ListarClienteComponent,
    DetallesClienteComponent,
    FooterComponent,
    HeaderComponent,
    MenuClienteComponent,
    MenuEmpleadoComponent,
    PerfilClienteComponent,
    PerfilEmpleadoComponent,
    PerfilUsuarioComponent,
    CambiarClaveComponent,
    MensajesUsuarioComponent,
    AgregarProductoComponent,
    DetallesProductoComponent,
    ListarProductoComponent,
    EditarProductoComponent,
    AgregarPedidoComponent,
    ListarPedidosComponent,
    ListarProductosDePedidoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
