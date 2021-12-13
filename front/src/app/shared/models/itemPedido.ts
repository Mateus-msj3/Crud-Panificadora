import {Produto} from "./produto";
import {Pedido} from "./pedido";

export class ItemPedido {

  id!: number;
  pedido!: Pedido;
  produto!: Produto;
  quantidade!: number;
  valorTotalItens!: number;

}
