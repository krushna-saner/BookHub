package com.bookhub.controller;

import com.bookhub.model.Book;
import com.bookhub.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://book-hub-snowy.vercel.app"
})
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }

    @GetMapping("/category/{category}")
    public List<Book> getByCategory(@PathVariable String category) {
        return bookService.getByCategory(category);
    }

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String name) {
        return bookService.searchBooks(name);
    }
}