import {Component, OnInit} from '@angular/core';
import {ClienteService} from "../../services/cliente-service.service";
import {ClienteFiltros} from "../../models/cliente-filtros";
import {Cliente} from "../../models/cliente";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {PageEvent} from "@angular/material/paginator";
import {PaginatorHelper} from "../../models/paginator-helper";
import {toQuery} from "../../models/utils";

@Component({
  selector: 'app-cliente-listagem',
  templateUrl: './cliente-listagem.component.html',
  styleUrls: ['./cliente-listagem.component.css']
})
export class ClienteListagemComponent implements OnInit {

  quantidade = 0;
  clientes: Cliente[] = [];
  qtdPaginas = 0;
  pagina = 0;
  tamanhosPagina: number[] = [5, 10, 25, 100];
  dataSource: any;
  paginatorHelper = new PaginatorHelper();

  colunas: string[] = ["id", "nome", "latitude", "longitude", "acoes"];

  constructor(
    private router: Router,
    private service: ClienteService,
    public filtros: ClienteFiltros,
  ) {
  }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listar(this.filtros, toQuery(this.paginatorHelper)).subscribe((page) => {
      if (page) {
        this.clientes = page.content;
        this.quantidade = page.totalElements;
        this.qtdPaginas = page.totalPages;
        this.pagina = page.pageable.pageNumber;
        this.dataSource = new MatTableDataSource(this.clientes);
      }
    });
  }

  changePage(event: PageEvent) {
    console.log(event);
    this.paginatorHelper.size = event.pageSize;
    this.paginatorHelper.page = event.pageIndex;
    this.listar();
  }

  novo() {
    this.router.navigate(['edicao/']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public editar(id: number) {
    this.router.navigate(['edicao/' + id]);
  }

  public excluir(cliente: Cliente) {
    this.service.excluir(cliente.id).subscribe((resposta) => {
      if (resposta == null) {
        this.listar();
      }
    });
  }
}
