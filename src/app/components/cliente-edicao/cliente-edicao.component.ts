import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../models/cliente";
import {ClienteService} from "../../services/cliente-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cliente-edicao',
  templateUrl: './cliente-edicao.component.html',
  styleUrls: ['./cliente-edicao.component.css']
})
export class ClienteEdicaoComponent implements OnInit {

  cliente= new Cliente();

  constructor(private clienteService: ClienteService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get("id")!;
    this.buscarPorId();
  }

  public buscarPorId() {
    console.log(this.cliente);
    if (this.cliente.id) {
      this.clienteService.buscarPorId(this.cliente.id).subscribe((data) => {
        this.cliente = data;
      });
      console.log(this.cliente);
    }
  }

  public salvar() {
    this.clienteService.salvar(this.cliente).subscribe((data) => {
      this.cliente = data;
      this.router.navigate(['']);
    });
  }

  public cancelar() {
    this.router.navigate(['']);
  }

}
