package com.example.urlshortener.service;

import com.example.urlshortener.dto.CachedUrl;
import com.example.urlshortener.dto.CreateUrlRequest;
import com.example.urlshortener.dto.UrlResponse;
import com.example.urlshortener.dto.UrlStatsResponse;
import com.example.urlshortener.exception.AliasAlreadyExistsException;
import com.example.urlshortener.exception.UrlExpiredException;
import com.example.urlshortener.exception.UrlNotFoundException;
import com.example.urlshortener.model.UrlMapping;
import com.example.urlshortener.repository.UrlMappingRepository;
import com.example.urlshortener.util.Base62;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Service
public class UrlService {

    private static final long ID_OFFSET = 100_000_000L; // makes codes at least 5-6 chars
    private static final Set<String> RESERVED = Set.of("api", "swagger-ui", "h2-console", "v3");

    private final UrlMappingRepository repository;
    private final UrlLookupService lookupService;

    public UrlService(UrlMappingRepository repository, UrlLookupService lookupService) {
        this.repository = repository;
        this.lookupService = lookupService;
    }

    @Transactional
    public UrlResponse create(CreateUrlRequest request, String baseUrl) {
        LocalDateTime now = LocalDateTime.now();

        UrlMapping mapping = new UrlMapping();
        mapping.setLongUrl(request.getLongUrl());
        mapping.setCreatedAt(now);
        if (request.getExpiryDays() != null) {
            mapping.setExpiresAt(now.plusDays(request.getExpiryDays()));
        }

        String alias = request.getCustomAlias();
        if (alias != null && !alias.isBlank()) {
            if (RESERVED.contains(alias.toLowerCase()) || repository.existsByShortCode(alias)) {
                throw new AliasAlreadyExistsException(alias);
            }
            mapping.setShortCode(alias);
            mapping.setCustomAlias(true);
            repository.save(mapping);
        } else {
            // 1) save with a temporary unique code to get the auto-generated id
            mapping.setShortCode(UUID.randomUUID().toString());
            repository.save(mapping);
            // 2) derive the real short code from the id (Base62)
            mapping.setShortCode(Base62.encode(mapping.getId() + ID_OFFSET));
            repository.save(mapping);
        }

        return new UrlResponse(mapping.getShortCode(), baseUrl + "/" + mapping.getShortCode(),
                mapping.getLongUrl(), mapping.getExpiresAt());
    }

    /** Resolve the long URL (cache first) and record the click. */
    @Transactional
    public String resolveAndTrack(String code) {
        CachedUrl cached = lookupService.find(code);
        if (cached.expiresAt() != null && cached.expiresAt().isBefore(LocalDateTime.now())) {
            throw new UrlExpiredException(code);
        }
        repository.incrementClicks(code);
        return cached.longUrl();
    }

    @Transactional(readOnly = true)
    public UrlStatsResponse stats(String code) {
        UrlMapping m = repository.findByShortCode(code).orElseThrow(() -> new UrlNotFoundException(code));
        return new UrlStatsResponse(m.getShortCode(), m.getLongUrl(), m.getClickCount(),
                m.getCreatedAt(), m.getExpiresAt());
    }
}
