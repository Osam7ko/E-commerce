package com.osama.ecommerce.domain.dto;

import com.osama.ecommerce.domain.entity.Address;
import com.osama.ecommerce.domain.entity.Customer;
import com.osama.ecommerce.domain.entity.Order;
import com.osama.ecommerce.domain.entity.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Purchase {
    private Order order;
    private Customer customer;
    private Address billingAddress;
    private Address shippingAddress;

    private Set<OrderItem> orderItems;
}