package br.com.springboot.apirestpanificadora.repositorys;

import br.com.springboot.apirestpanificadora.models.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
