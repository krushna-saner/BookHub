package com.bookhub.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.bookhub.model.Order;

public interface OrderRepository extends MongoRepository<Order, String> {

	List<Order> findByUserEmail(String email);
}