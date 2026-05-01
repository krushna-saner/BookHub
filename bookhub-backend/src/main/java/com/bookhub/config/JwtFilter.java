package com.bookhub.config;

import com.bookhub.util.JwtUtil;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;

        String authHeader = req.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            try {
                String email = JwtUtil.extractEmail(token);
                req.setAttribute("email", email); // ✅ IMPORTANT
            } catch (Exception e) {
                System.out.println("Invalid Token");
            }
        }

        chain.doFilter(request, response);
    }
}