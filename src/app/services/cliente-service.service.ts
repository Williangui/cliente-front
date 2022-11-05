import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ClienteFiltros} from "../models/cliente-filtros";
import {Cliente} from "../models/cliente";
import {Observable} from "rxjs";
import {Page} from "../models/page.model";
import {PaginatorHelper} from "../models/paginator-helper";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl = environment.baseUrl + "cliente";

  constructor(
    private httpClient: HttpClient
  ) {
  }

  buscarPorId(id: any): Observable<Cliente> {
    const url = `${this.baseUrl}/buscarPorId/${id}`;
    return this.httpClient.get<Cliente>(url);
  }

  listar(filtros: ClienteFiltros, pageable: string) {
    const url = this.baseUrl + `/listar?${pageable}`;
    return this.httpClient.post<any>(url, filtros);
  }

  salvar(cliente: Cliente): Observable<Cliente> {
    const url = this.baseUrl + '/salvar';
    return this.httpClient.post<Cliente>(url, cliente);
  }
}
