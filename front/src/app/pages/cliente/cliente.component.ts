import {Component, NgModule, OnInit, OnDestroy} from '@angular/core';
import {Cliente} from "../../shared/models/cliente";
import {ClienteService} from "../../shared/services/cliente.service";
import {DxDataGridModule, DxLoadPanelModule} from "devextreme-angular";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import applyChanges from "devextreme/data/apply_changes";


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = [];

  loadPanelPosition = { of: '#gridContainer' };

  isLoading: boolean = false;

  constructor(private clienteService: ClienteService) {
  }

  ngOnInit(): void {
     this.dadosClientes()
  }

  async dadosClientes() {
    this.isLoading = true;
    this.clientes = await this.clienteService.getClientes().toPromise();
    this.isLoading = false;
  }

  onSaving(event: any){
    this.isLoading = true;

      if (event) {
        event.cancel = false;
        event.promises = this.processSaving(event);
      }
  }

  async processSaving(event: any) {
    for (let change of event.changes) {
      if (change.type == 'insert') {
        let novo = await this.clienteService.postCliente(change.data).toPromise();
        this.clientes.push(novo);
        this.clientes = applyChanges(this.clientes, [novo], {keyExpr: 'id'});
        this.dadosClientes();
      }
      else if (change.type == 'update') {
        change.data = Object.assign(change.key, change.data);
        let alterado = await this.clienteService.putCliente(change.data).toPromise();
        this.clientes = applyChanges(this.clientes, [alterado], {keyExpr: 'id'});
      }
      else if (change.type == 'remove') {
        await this.clienteService.deleteCliente(change.key).toPromise();
      }

    }
    event.cancel = false;
    this.isLoading = false;

  }

}


@NgModule({
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxLoadPanelModule,
    HttpClientModule,
  ],
  declarations: [ ClienteComponent ],
  exports: [ ClienteComponent  ]
})
export class ClienteModule { }
