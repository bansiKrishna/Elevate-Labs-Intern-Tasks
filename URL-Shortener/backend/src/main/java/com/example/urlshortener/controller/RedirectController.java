package com.example.urlshortener.controller;

import com.example.urlshortener.service.UrlService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
public class RedirectController {

    private final UrlService urlService;

    public RedirectController(UrlService urlService) {
        this.urlService = urlService;
    }

    // regex excludes dots so /swagger-ui.html etc. are not captured
    @GetMapping("/{code:[a-zA-Z0-9_-]{1,40}}")
    public ResponseEntity<Void> redirect(@PathVariable String code) {
        String target = urlService.resolveAndTrack(code);
        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(target)).build();
    }
}
