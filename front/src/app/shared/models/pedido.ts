import {Cliente} from "./cliente";
import {ItemPedido} from "./itemPedido";

export class Pedido {

  id!: number;
  numero!: string;
  dataPedido!: string;
  cliente!: Cliente;
  itens!: ItemPedido[];
  valorTotal!: number;


}
