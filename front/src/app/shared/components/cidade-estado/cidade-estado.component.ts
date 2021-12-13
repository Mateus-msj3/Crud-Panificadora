import {Component, EventEmitter, Input, NgModule, OnInit, Output} from '@angular/core';

import {DxSelectBoxModule} from "devextreme-angular";
import {BrowserModule} from "@angular/platform-browser";
import {Estado} from "../../models/estado";

import {CidadeEstadoService} from "../../services/cidade-estado.service";
import {Cidade} from "../../models/cidade";

@Component({
  selector: 'app-cidade-estado',
  templateUrl: 'cidade-estado.component.html',
  styleUrls: ['./cidade-estado.component.scss']
})
export class CidadeEstadoComponent implements OnInit {

  estado: Estado[] = [];
  cidade: Cidade[] = [];

  @Input() nomeEstado: any;
  @Output() nomeEstadoChange = new EventEmitter();

  @Output() nomeCidade = new EventEmitter();

  constructor(private cidadeEstado: CidadeEstadoService) { }

  ngOnInit(): void {
    this.cidadeEstado.getEstados().subscribe(dados => this.estado = dados);

  }

  mostraSiglaENome(item: any) {
  return item && '' + item.sigla + ' - ' + item.nome;
  }

  onValueChangedEstado(event: any) {
    this.cidadeEstado.getCidades(event.value.id).subscribe(cidades => {
      this.cidade = cidades;
    });
    this.nomeEstadoChange.emit(event.value.nome )
    //console.log(event);
  }

  onValueChangedCidade(event: any) {
    this.nomeCidade.emit({nome: event.value.nome})
  }
}

@NgModule({
  imports: [
    BrowserModule,
    DxSelectBoxModule,
  ],
  declarations: [ CidadeEstadoComponent ],
  exports: [ CidadeEstadoComponent ]
})
export class CidadeEstadoModule { }
