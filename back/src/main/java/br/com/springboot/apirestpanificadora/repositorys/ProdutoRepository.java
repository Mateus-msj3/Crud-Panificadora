package br.com.springboot.apirestpanificadora.repositorys;

import br.com.springboot.apirestpanificadora.models.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
