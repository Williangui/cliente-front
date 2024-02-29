import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClienteListagemComponent} from './component/cliente-listagem/cliente-listagem.component';
import {ClienteEdicaoComponent} from './component/cliente-edicao/cliente-edicao.component';
import {HomeComponent} from './component/home/home.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {MenuComponent} from './component/menu/menu.component';
import {ListaPaginadaComponent} from './component/lista-paginada/lista-paginada.component';
import {FiltrosComponent} from './component/filtros/filtros.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ModalContatoComponent } from './component/modal-contato/modal-contato.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ToastrModule} from "ngx-toastr";
import {ErrorInterceptor} from "./error/error.interceptor";
import { TelefoneFormatPipe } from './util/telefone-format.pipe';

@NgModule({
    declarations: [
        AppComponent,
        ClienteListagemComponent,
        ClienteEdicaoComponent,
        HomeComponent,
        DashboardComponent,
        MenuComponent,
        ListaPaginadaComponent,
        FiltrosComponent,
        ModalContatoComponent,
        TelefoneFormatPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatTooltipModule,
        MatDialogModule,
        ToastrModule.forRoot()
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        TelefoneFormatPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
