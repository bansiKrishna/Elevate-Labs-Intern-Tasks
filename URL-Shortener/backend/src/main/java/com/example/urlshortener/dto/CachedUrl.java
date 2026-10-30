package com.example.urlshortener.dto;

import java.time.LocalDateTime;

public record CachedUrl(String longUrl, LocalDateTime expiresAt) {
}
