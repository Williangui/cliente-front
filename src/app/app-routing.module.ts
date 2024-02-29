import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {ClienteListagemComponent} from "./component/cliente-listagem/cliente-listagem.component";
import {ClienteEdicaoComponent} from "./component/cliente-edicao/cliente-edicao.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: DashboardComponent},
      {path: 'clientes', component: ClienteListagemComponent},
      {path: 'clientes/edicao', component: ClienteEdicaoComponent},
      {path: 'clientes/edicao/:id', component: ClienteEdicaoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
