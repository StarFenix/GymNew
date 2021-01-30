import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';

const routes: Routes = [
  {path: 'listaClientes', component: ListadoClientesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
