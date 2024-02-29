import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContatoService} from "../../service/contato.service";
import {TelefoneFormatPipe} from "../../util/telefone-format.pipe";

@Component({
  selector: 'app-modal-contato',
  templateUrl: './modal-contato.component.html',
  styleUrls: ['./modal-contato.component.scss']
})
export class ModalContatoComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({})

  constructor(
      @Inject(TelefoneFormatPipe)private telefoneFormatPipe: TelefoneFormatPipe,
      public dialogRef: MatDialogRef<ModalContatoComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      private contatoService: ContatoService,) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.preencherDados();
  }

  private criarFormulario() {
    this.formGroup = this.formBuilder.group({
      id: [{value: null, disabled: true}],
      telefone: ['', Validators.required],
    });
  }

  private preencherDados() {
    this.formGroup.patchValue({
      id: this.data.id,
      telefone: this.telefoneFormatPipe.transform(this.data.telefone)
    })
  }

  salvar() {
    const contato = {
      id: this.formGroup.get('id')?.value,
      telefone: this.formGroup.get('telefone')?.value,
      idCliente:  this.data.cliente.id
    }
    this.contatoService.salvar(contato).subscribe(() => {});
    this.dialogRef.close();
  }

  limpar() {
    this.formGroup.get('telefone')?.reset();
  }

  cancelar() {
    this.dialogRef.close({transferido: false});
  }


}
