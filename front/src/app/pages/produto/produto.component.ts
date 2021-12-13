import {Component, NgModule, OnInit} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {DxDataGridModule, DxLoadPanelModule} from "devextreme-angular";
import {HttpClientModule} from "@angular/common/http";
import {ProdutoService} from "../../shared/services/produto.service";
import {Produto} from "../../shared/models/produto";


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService ) { }

  ngOnInit(): void {
    this.getDadosProduto();
  }

  async getDadosProduto () {
    this.produtos = await this.produtoService.getProdutos().toPromise();
  }

  async onInsertingProduto (event: any) {
    debugger;
    let dados = event.data;
    const novoProduto = await this.produtoService.postProduto(dados).toPromise();
    this.getDadosProduto();
  }

  async onUpdatingProduto (event: any) {
    event.data = Object.assign(event.oldData, event.newData);
    const alteracoesProduto = await this.produtoService.putProduto(event.data).toPromise();
  }

  async onRemoveProduto (event: any) {
    const produtoRemovido = await  this.produtoService.deleteProduto(event.key).toPromise();
  }

}

@NgModule({
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxLoadPanelModule,
    HttpClientModule,
  ],
  declarations: [ ProdutoComponent ],
  exports: [ ProdutoComponent  ]
})
export class ProdutoModule { }
