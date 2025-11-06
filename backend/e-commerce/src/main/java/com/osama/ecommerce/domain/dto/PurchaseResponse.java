package com.osama.ecommerce.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PurchaseResponse {

    private final String orderTrackingNumber;
}