package com.example.urlshortener.service;

import com.example.urlshortener.dto.CachedUrl;
import com.example.urlshortener.exception.UrlNotFoundException;
import com.example.urlshortener.repository.UrlMappingRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/** Separate bean so @Cacheable works (Spring caching uses proxies, self-calls bypass it). */
@Service
public class UrlLookupService {

    private final UrlMappingRepository repository;

    public UrlLookupService(UrlMappingRepository repository) {
        this.repository = repository;
    }

    @Cacheable(value = "urls", key = "#code")
    public CachedUrl find(String code) {
        return repository.findByShortCode(code)
                .map(m -> new CachedUrl(m.getLongUrl(), m.getExpiresAt()))
                .orElseThrow(() -> new UrlNotFoundException(code));
    }
}
