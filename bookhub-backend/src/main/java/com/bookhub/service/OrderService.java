package com.bookhub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookhub.model.Order;
import com.bookhub.repository.OrderRepository;
import java.util.*;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order placeOrder(Order order) {
        order.setStatus("PENDING");
        return orderRepository.save(order);
    }
 
    public List<Order> getOrdersByEmail(String email) {
        return orderRepository.findByUserEmail(email);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // ✅ NEW METHOD
    public Order updateStatus(String id, String status) {
        Order order = orderRepository.findById(id).orElse(null);

        if (order != null) {
            order.setStatus(status);
            return orderRepository.save(order);
        }
        return null;
    }
}