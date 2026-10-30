package com.example.urlshortener.dto;

import java.time.LocalDateTime;

public record UrlStatsResponse(String shortCode, String longUrl, long clickCount,
                               LocalDateTime createdAt, LocalDateTime expiresAt) {
}
