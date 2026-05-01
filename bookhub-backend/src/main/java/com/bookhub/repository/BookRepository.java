package com.bookhub.repository;

import com.bookhub.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {
    List<Book> findByCategoryIgnoreCase(String category);
    List<Book> findByNameContainingIgnoreCase(String name);
}