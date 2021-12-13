package br.com.springboot.apirestpanificadora.controllers;

import br.com.springboot.apirestpanificadora.models.Cliente;
import br.com.springboot.apirestpanificadora.models.Produto;
import br.com.springboot.apirestpanificadora.repositorys.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/cliente")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("/")
    @ResponseBody
    public ResponseEntity<List<Cliente>> listaTodosClientes(){
        List<Cliente> clientes = clienteRepository.findAll();
        return new ResponseEntity<List<Cliente>>(clientes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Cliente> listaClientePorId(@PathVariable (value = "id") long id){
        Optional<Cliente> cliente = clienteRepository.findById(id);
        if(cliente.isPresent()){
            return new ResponseEntity<Cliente>(cliente.get(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/")
    @ResponseBody
    public ResponseEntity<Cliente> adicionarCliente(@RequestBody Cliente cliente){
        Cliente novoCliente = clienteRepository.save(cliente);
        return new ResponseEntity<Cliente>(novoCliente, HttpStatus.CREATED);
    }


    @PutMapping("/")
    @ResponseBody
    public ResponseEntity<Cliente> atualizarCliente(@RequestBody Cliente cliente){
        Cliente clienteSalvo = clienteRepository.save(cliente);
        return  new ResponseEntity<Cliente>(clienteSalvo, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Object> deletarCliente(@PathVariable(value = "id") Long id){
       Optional<Cliente> cliente = clienteRepository.findById(id);
        if (id == null || id < 0){
            return new ResponseEntity<>("Id inválido", HttpStatus.NOT_FOUND);
        }
       if (cliente.isPresent()){
            clienteRepository.delete(cliente.get());
            return new ResponseEntity<>("Usuario Deletado com sucesso!", HttpStatus.OK);
       }else{
           return new ResponseEntity<>("Usuario não encontrado!", HttpStatus.NOT_FOUND);
       }
    }

}
