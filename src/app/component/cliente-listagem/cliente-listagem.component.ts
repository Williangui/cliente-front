import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Filtro} from "../../model/filtro/filtro";
import {Cliente} from "../../model/cliente/cliente";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ClienteFiltros} from "../../model/cliente/cliente-filtros";
import {ColunaListaPaginada} from "../lista-paginada/coluna-lista-paginada";
import {ColunaAcoesListaPaginada} from "../lista-paginada/coluna-acoes-lista-paginada";
import {PaginatorHelper, ParamPageable, toQuery} from "../lista-paginada/paginator-helper";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {ClienteService} from "../../service/cliente.service";
import {PageService} from "../../service/page.service";

@Component({
  selector: 'app-cliente-listagem',
  templateUrl: './cliente-listagem.component.html',
  styleUrls: ['./cliente-listagem.component.scss']
})
export class ClienteListagemComponent implements OnInit {

  header = ' - Listagem de Clientes';
  filtros: Filtro[] = [
    {
      label: 'Código',
      field: 'id',
      type: 'number',
      width: '120px'
    },
    {
      label: 'Nome',
      field: 'nome',
      type: 'text',
      width: '400px'
    },
    {
      label: 'Endereco',
      field: 'endereco',
      type: 'text',
      width: '300px'
    },
    {
      label: 'Bairro',
      field: 'bairro',
      type: 'text',
      width: '300px'
    },
    {
      label: 'Telefone',
      field: 'telefone',
      type: 'text',
      width: '300px'
    },
  ];
  clientes: Cliente[] = [];
  formGroupFiltros: FormGroup = new FormGroup({});
  clienteFiltros: ClienteFiltros = new ClienteFiltros();
  displayedColumns = ['id', 'nome'];
  colunas: ColunaListaPaginada[] = [
    {
      nomeHeader: 'Código',
      nomeColuna: 'id',
      widthColuna: '20%',
      cellAlign: 'center'
    }, {
      nomeHeader: 'Nome',
      nomeColuna: 'nome',
      widthColuna: '80%',
      cellAlign: 'center'
    }
  ]
  acoes: ColunaAcoesListaPaginada[] = [
    {
      evento: (value) => this.editar(value),
      icone: 'far fa-edit',
      color: 'primary',
      label: 'Editar'
    },
    {
      evento: (value) => this.excluir(value),
      icone: 'far fa-trash-alt',
      color: 'warn',
      label: 'Excluir'
    }
  ];
  paramPageable: ParamPageable = new ParamPageable(10, 0, 'id,ASC');
  provider: Observable<any> = this.clienteService.listar(this.clienteFiltros, toQuery(this.paramPageable));
  title = 'Clientes';
  @Output() pesquisarEvent = new EventEmitter();

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private clienteService: ClienteService,
      private pageService: PageService

  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.pageService.setHeader(this.header);
    }, 0);
    this.criarFormulario();
  }

  criarFormulario() {
    this.formGroupFiltros = this.formBuilder.group({
      id: [],
      nome: [],
      endereco: [],
      bairro: [],
      telefone: [],
    })
  }

  pesquisar(filtrosRecebidos: Filtro[]) {
    filtrosRecebidos.forEach(filtro => {
      switch (filtro.field) {
        case 'id': {
          this.clienteFiltros.id = filtro.valor;
          break;
        }
        case 'nome': {
          this.clienteFiltros.nome = filtro.valor;
          break;
        }
        case 'endereco': {
          this.clienteFiltros.endereco = filtro.valor;
          break;
        }
        case 'bairro': {
          this.clienteFiltros.bairro = filtro.valor;
          break;
        }
        case 'telefone': {
          this.clienteFiltros.telefone = filtro.valor;
          break;
        }
      }
    });
    this.provider = this.clienteService.listar(this.clienteFiltros, toQuery(this.paramPageable));
  }

  changePaginator(paginator: PaginatorHelper) {
    this.paramPageable = new ParamPageable(paginator.size, paginator.page, paginator.sort);
    this.provider = this.clienteService.listar(this.clienteFiltros, toQuery(this.paramPageable))
  }

  editar(produto: any) {
    this.router.navigate(['clientes/edicao/' + produto.id]);
  }

  novo() {
    this.router.navigate(['clientes/edicao']);
  }

  public excluir(cliente: Cliente) {
    this.clienteService.excluir(cliente.id).subscribe((resposta) => {
      if (resposta == null) {
        this.provider = this.clienteService.listar(this.clienteFiltros, toQuery(this.paramPageable))
      }
    });
  }

}
