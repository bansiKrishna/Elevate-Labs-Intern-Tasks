package com.example.urlshortener.dto;

import jakarta.validation.constraints.*;

public class CreateUrlRequest {

    @NotBlank(message = "longUrl is required")
    @Size(max = 2048, message = "longUrl is too long")
    @Pattern(regexp = "^https?://.+", message = "longUrl must start with http:// or https://")
    private String longUrl;

    @Pattern(regexp = "^[a-zA-Z0-9_-]{4,20}$", message = "alias must be 4-20 chars: letters, digits, _ or -")
    private String customAlias;

    @Min(value = 1, message = "expiryDays must be at least 1")
    @Max(value = 365, message = "expiryDays must be at most 365")
    private Integer expiryDays;

    public String getLongUrl() { return longUrl; }
    public void setLongUrl(String longUrl) { this.longUrl = longUrl; }
    public String getCustomAlias() { return customAlias; }
    public void setCustomAlias(String customAlias) { this.customAlias = customAlias; }
    public Integer getExpiryDays() { return expiryDays; }
    public void setExpiryDays(Integer expiryDays) { this.expiryDays = expiryDays; }
}
