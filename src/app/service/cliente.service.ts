import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ClienteFiltros} from "../model/cliente/cliente-filtros";
import {Observable} from "rxjs";
import {Cliente} from "../model/cliente/cliente";

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    baseUrl = environment.baseUrl + "/api/v1/cliente";

    constructor(
        private httpClient: HttpClient
    ) {
    }

    listar(filtros: ClienteFiltros, pageable: string) {
        const url = this.baseUrl + `/listar?${pageable}`;
        return this.httpClient.post<any>(url, filtros);
    }

    buscarPorId(id: any): Observable<Cliente> {
        const url = `${this.baseUrl}/buscarPorId/${id}`;
        return this.httpClient.get<Cliente>(url);
    }

    salvar(cliente: Cliente): Observable<Cliente> {
        const url = this.baseUrl + '/salvar';
        return this.httpClient.post<Cliente>(url, cliente);
    }

    excluir(id: any): Observable<void> {
        const url = this.baseUrl + `/excluir/${id}`;
        return this.httpClient.delete<void>(url);
    }
}
