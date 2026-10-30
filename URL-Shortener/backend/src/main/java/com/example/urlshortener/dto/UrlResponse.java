package com.example.urlshortener.dto;

import java.time.LocalDateTime;

public record UrlResponse(String shortCode, String shortUrl, String longUrl, LocalDateTime expiresAt) {
}
