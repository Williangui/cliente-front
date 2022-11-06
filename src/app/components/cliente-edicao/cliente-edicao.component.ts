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

  cliente = new Cliente();
  lat = -16.697406;
  lng = -49.257813
  map = null;

  constructor(private clienteService: ClienteService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get("id")!;
    this.buscarPorId();
  }

  public buscarPorId() {
    if (this.cliente.id) {
      this.clienteService.buscarPorId(this.cliente.id).subscribe((data) => {
        this.cliente = data;
        this.recentralizarMapa();
      });
    }
  }

  public recentralizarMapa() {
    this.lat = this.cliente.latitude;
    this.lng = this.cliente.longitude;
  }

  public salvar() {
    this.clienteService.salvar(this.cliente).subscribe((data) => {
      this.cliente = data;
      this.router.navigate(['']);
      this.recentralizarMapa()
    });
  }

  public cancelar() {
    this.router.navigate(['']);
  }

}
