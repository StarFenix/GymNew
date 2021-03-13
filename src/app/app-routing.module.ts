import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { PreciosComponent } from './precios/precios.component';

const routes: Routes = [
  {path: 'listaClientes', component: ListadoClientesComponent},
  {path: 'agregarCliente', component: AgregarClienteComponent},
  {path: 'agregarCliente/:clienteID', component: AgregarClienteComponent},
  {path: 'precios', component: PreciosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
