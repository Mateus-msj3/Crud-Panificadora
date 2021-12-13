package br.com.springboot.apirestpanificadora.repositorys;

import br.com.springboot.apirestpanificadora.models.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
