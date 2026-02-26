package net.abbaspour.auth0.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/public")
    public ResponseEntity<Map<String, Object>> publicEndpoint() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "This is a public endpoint");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/private")
    public ResponseEntity<Map<String, Object>> privateEndpoint() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "This is a private endpoint");
        return ResponseEntity.ok(response);
    }
}