package com.osama.ecommerce.service;

import com.osama.ecommerce.domain.dao.CustomerRepository;
import com.osama.ecommerce.domain.dto.Purchase;
import com.osama.ecommerce.domain.dto.PurchaseResponse;
import com.osama.ecommerce.domain.entity.Customer;
import com.osama.ecommerce.domain.entity.Order;
import com.osama.ecommerce.domain.entity.OrderItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CheckoutServiceImpl implements CheckoutService {

    private final CustomerRepository customerRepository;

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        // retrive the order info from dto
        Order order = purchase.getOrder();

        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // pupolate order with orderItem
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        // poplate order with billing adn shipping adresses
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        // poplate customer with order
        Customer customer = purchase.getCustomer();
        customer.add(order);

        // save to database
        customerRepository.save(customer);

        // return response

        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {

        // generate random UUID ( UUID-VErsion 4)
        return UUID.randomUUID().toString();
    }
}