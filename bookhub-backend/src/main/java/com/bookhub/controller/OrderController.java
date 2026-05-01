package com.bookhub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookhub.model.Order;
import com.bookhub.service.OrderService;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // ✅ PLACE ORDER
    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody Order order, HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        if (email == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        // ✅ IMPORTANT: save user email
        order.setUserEmail(email);

        return ResponseEntity.ok(orderService.placeOrder(order));
    }

    // ✅ USER ORDERS ONLY
    @GetMapping
    public ResponseEntity<?> getOrders(HttpServletRequest request) {

        String email = (String) request.getAttribute("email");

        if (email == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        return ResponseEntity.ok(orderService.getOrdersByEmail(email));
    }

    // ✅ ADMIN: GET ALL ORDERS
    @GetMapping("/admin")
    public ResponseEntity<?> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // ✅ ADMIN: UPDATE STATUS
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable String id,
            @RequestParam String status
    ) {
        Order updated = orderService.updateStatus(id, status);

        if (updated == null) {
            return ResponseEntity.status(404).body("Order not found");
        }

        return ResponseEntity.ok(updated);
    }
}