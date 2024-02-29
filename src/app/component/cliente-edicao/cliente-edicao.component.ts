import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../model/cliente/cliente";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ClienteService} from "../../service/cliente.service";
import {PageService} from "../../service/page.service";
import {ColunaListaPaginada} from "../lista-paginada/coluna-lista-paginada";
import {ColunaAcoesListaPaginada} from "../lista-paginada/coluna-acoes-lista-paginada";
import {PaginatorHelper, ParamPageable, toQuery} from "../lista-paginada/paginator-helper";
import {ContatoService} from "../../service/contato.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalContatoComponent} from "../modal-contato/modal-contato.component";
import {Observable} from "rxjs";

@Component({
    selector: 'app-cliente-edicao',
    templateUrl: './cliente-edicao.component.html',
    styleUrls: ['./cliente-edicao.component.scss']
})
export class ClienteEdicaoComponent implements OnInit {

    header = 'Cadastro de Cliente';
    cliente = new Cliente();
    formGroup: FormGroup = new FormGroup({});
    displayedColumns = ['id', 'telefone'];
    colunas: ColunaListaPaginada[] = [
        {
            nomeHeader: 'Código',
            nomeColuna: 'id',
            widthColuna: '20%',
            cellAlign: 'center'
        }, {
            nomeHeader: 'Telefone',
            nomeColuna: 'telefone',
            widthColuna: '80%',
            cellAlign: 'center',
            telefone: true
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
    provider = new Observable();

    constructor(private clienteService: ClienteService,
                private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private pageService: PageService,
                private contatoService: ContatoService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.pageService.setHeader(this.header);
        }, 0);
        this.criarFormulario();
        const id = this.route.snapshot.paramMap.get("id")!;
        if (id) {
            this.cliente.id = +id;
            this.buscarPorId();
        }
    }

    criarFormulario() {
        this.formGroup = this.formBuilder.group({
            id: [{value: null, disabled: true}],
            nome: ['', [Validators.required, Validators.minLength(10)]],
            endereco: [],
            bairro: [],
        })
    }

    public buscarPorId() {
        if (this.cliente.id) {
            this.clienteService.buscarPorId(this.cliente.id).subscribe((data) => {
                this.cliente = data;
                this.formGroup.patchValue({
                    id: this.cliente.id,
                    nome: this.cliente.nome,
                    endereco: this.cliente.endereco,
                    bairro: this.cliente.bairro,
                })
            });
            this.provider = this.contatoService.listarPorCliente(this.cliente.id, toQuery(this.paramPageable))
        }
    }

    public salvar() {
        this.setCliente();
        this.clienteService.salvar(this.cliente).subscribe((data) => {
            if (data) {
                this.cliente = data;
                this.router.navigate(['/clientes']);
            }
        });
    }

    setCliente() {
        this.cliente.id = this.formGroup.get('id')?.value;
        this.cliente.nome = this.formGroup.get('nome')?.value;
        this.cliente.endereco = this.formGroup.get('endereco')?.value;
        this.cliente.bairro = this.formGroup.get('bairro')?.value;
    }

    limpar() {
        this.formGroup.reset();
    }

    public cancelar() {
        this.router.navigate(['/clientes']);
    }

    changePaginator(paginator: PaginatorHelper) {
        this.paramPageable = new ParamPageable(paginator.size, paginator.page, paginator.sort);
        if (this.cliente.id) {
            this.provider = this.contatoService.listarPorCliente(this.cliente.id, toQuery(this.paramPageable));
        }

    }

    private editar(value: any) {
        const dialogAberto = this.dialog.open(ModalContatoComponent, {
            width: '30%',
            data: {
                id: value.id,
                telefone: value.telefone,
                cliente: this.cliente
            }
        });
        dialogAberto.afterClosed().subscribe(result => {
            this.provider = this.contatoService.listarPorCliente(this.cliente.id, toQuery(this.paramPageable));
        })
    }

    public excluir(cliente: Cliente) {
        this.contatoService.excluir(cliente.id).subscribe((resposta) => {
            if (resposta == null) {
                this.provider = this.contatoService.listarPorCliente(this.cliente.id, toQuery(this.paramPageable))
            }
        });
    }

    novoContato() {
        const dialogAberto = this.dialog.open(ModalContatoComponent, {
            width: '30%',
            data: {
                id: null,
                telefone: null,
                cliente: this.cliente
            }
        });
        dialogAberto.afterClosed().subscribe( result => {
            this.provider = this.contatoService.listarPorCliente(this.cliente.id, toQuery(this.paramPageable));
        })
    }
}
