package br.com.springboot.apirestpanificadora.controllers;

import br.com.springboot.apirestpanificadora.models.Produto;
import br.com.springboot.apirestpanificadora.repositorys.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/produto")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping("/")
    @ResponseBody
    public ResponseEntity<List<Produto>> listarTodosProdutos(){
        List<Produto> produtos = produtoRepository.findAll();
        return new ResponseEntity<List<Produto>>(produtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Produto> listarProdutoPorId(@PathVariable(value = "id") long id){
        Optional<Produto> produto = produtoRepository.findById(id);
        //Fazer a verificação por id
        if(produto.isPresent()){
            return new ResponseEntity<Produto>(produto.get(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/")
    @ResponseBody
    public ResponseEntity<Produto> adicionarProduto(@RequestBody Produto produto){
        Produto novoProduto = produtoRepository.save(produto);
        return new ResponseEntity<Produto>(novoProduto, HttpStatus.CREATED);
    }

    @PutMapping("/")
    @ResponseBody
    public ResponseEntity<Produto> atualizarProduto(@RequestBody Produto produto){
        Produto produtoSalvo = produtoRepository.save(produto);
        return  new ResponseEntity<Produto>(produtoSalvo, HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Object> deletarProduto(@PathVariable(value = "id") Long id){
        Optional<Produto> produto = produtoRepository.findById(id);
        if (id == null || id < 0){
            return new ResponseEntity<>("Id inválido", HttpStatus.NOT_FOUND);
        }
        if (produto.isPresent()){
            produtoRepository.delete(produto.get());
            return new ResponseEntity<>("Produto Deletado com sucesso!", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Produto não encontrado!", HttpStatus.NOT_FOUND);
        }
    }
}
