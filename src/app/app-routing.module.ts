import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClienteListagemComponent} from "./components/cliente-listagem/cliente-listagem.component";
import {ClienteEdicaoComponent} from "./components/cliente-edicao/cliente-edicao.component";

const routes: Routes = [
  {
    path: '',
    component: ClienteListagemComponent
  },
  {
    path: 'edicao/:id',
    component: ClienteEdicaoComponent
  },
  {
    path: 'edicao',
    component: ClienteEdicaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
