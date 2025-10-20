package com.osama.ecommerce.domain.dao;

import com.osama.ecommerce.domain.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}