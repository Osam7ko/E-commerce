package com.osama.ecommerce.service;

import com.osama.ecommerce.domain.dto.Purchase;
import com.osama.ecommerce.domain.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}