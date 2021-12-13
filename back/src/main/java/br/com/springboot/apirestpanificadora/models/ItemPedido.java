package br.com.springboot.apirestpanificadora.models;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "itens_pedidos")
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_pedido")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "id_produto")
    private Produto produto;

    private BigDecimal quantidade;

    private BigDecimal valorTotalItens = BigDecimal.ZERO;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public BigDecimal getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(BigDecimal quantidade) {
        this.quantidade = quantidade;
    }

    public BigDecimal getValorTotalItens() {
        //this.valorTotalItens = quantidade.multiply(produto.getValorUnitario());
        return valorTotalItens;
    }

    public void setValorTotalItens(BigDecimal valorTotalItens) {
        this.valorTotalItens = valorTotalItens;
    }
}
