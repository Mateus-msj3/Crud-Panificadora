package br.com.springboot.apirestpanificadora.controllers;

import br.com.springboot.apirestpanificadora.models.ItemPedido;
import br.com.springboot.apirestpanificadora.models.Pedido;
import br.com.springboot.apirestpanificadora.repositorys.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/pedido")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;


    @GetMapping("/")
    public ResponseEntity<List<Pedido>> listarTodosPedidos(){
        List<Pedido> pedido = pedidoRepository.findAll();
        return new ResponseEntity<List<Pedido>>(pedido, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> listarPedidoPorId(@PathVariable(value = "id") long id){
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        if(pedido.isPresent()){
            return new ResponseEntity<Pedido>(pedido.get(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/")
    public ResponseEntity<Pedido> adicionarPedido(@RequestBody Pedido pedido){
        BigDecimal valorTotalDoPedido = BigDecimal.ZERO;
        for(ItemPedido item: pedido.getItens()){
            item.setPedido(pedido);
            item.setValorTotalItens(item.getProduto().getValorUnitario().multiply(item.getQuantidade()));
            valorTotalDoPedido = valorTotalDoPedido.add(item.getValorTotalItens());

        }

        pedido.setValorTotal(valorTotalDoPedido);
        Pedido novoPedido = pedidoRepository.save(pedido);
        return new ResponseEntity<Pedido>(novoPedido, HttpStatus.CREATED);
    }

    @PutMapping("/")
    public ResponseEntity<Pedido> atualizarPedido(@RequestBody Pedido pedido){
        BigDecimal valorTotalDoPedido = BigDecimal.ZERO;
       for (ItemPedido item : pedido.getItens()) {
           item.setPedido(pedido);
           pedido.setItens(item.getPedido().getItens());
           item.setValorTotalItens(item.getProduto().getValorUnitario().multiply(item.getQuantidade()));
           valorTotalDoPedido = valorTotalDoPedido.add(item.getValorTotalItens());
       }
        pedido.setValorTotal(valorTotalDoPedido);
        Pedido pedidoAlterado = pedidoRepository.save(pedido);
        return new ResponseEntity<Pedido>(pedidoAlterado, HttpStatus.OK);
    }

//    @PutMapping("/")
//    public ResponseEntity<Pedido> atualizarPedido(@RequestBody Pedido pedido){
//        for(int i = 0; i < pedido.getItens().size(); i++){
//           pedido.getItens().get(i).setPedido(pedido);
//
//        }
//        pedidoRepository.save(pedido);
//        return new ResponseEntity<Pedido>(pedido, HttpStatus.OK);
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarPedidoPorId(@PathVariable(value = "id") Long id){
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        if (id == null || id < 0){
            return new ResponseEntity<>("Id inválido", HttpStatus.NOT_FOUND);
        }
        if (pedido.isPresent()){
            pedidoRepository.delete(pedido.get());
            return new ResponseEntity<>("Pedido Deletado com sucesso!", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Pedido não encontrado!", HttpStatus.NOT_FOUND);
        }
    }


}
