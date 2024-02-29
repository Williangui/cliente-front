import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Cliente} from "../model/cliente/cliente";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Contato} from "../model/contato/contato";
import {ClienteFiltros} from "../model/cliente/cliente-filtros";

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  baseUrl = environment.baseUrl + "/api/v1/contato";

  constructor(
      private httpClient: HttpClient
  ) {
  }

  listarPorCliente(id: any, pageable: string): Observable<Contato> {
    const url = `${this.baseUrl}/listarPorCliente?${pageable}`;
    return this.httpClient.post<Contato>(url, id);
  }

  excluir(id: any): Observable<void> {
    const url = this.baseUrl + `/excluir/${id}`;
    return this.httpClient.delete<void>(url);
  }

  salvar(contato: any): Observable<Contato> {
    const url = this.baseUrl + '/salvar';
    return this.httpClient.post<Contato>(url, contato);
  }
}
