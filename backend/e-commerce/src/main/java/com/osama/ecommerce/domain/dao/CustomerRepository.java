package com.osama.ecommerce.domain.dao;

import com.osama.ecommerce.domain.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

//@CrossOrigin("http://localhost:4200")
//@RepositoryRestResource(collectionResourceRel = "customer", path = "customer")
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}