
package com.example.urlshortener.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    private record Window(long startMillis, int count) {
    }

    private final ConcurrentHashMap<String, Window> windows =
            new ConcurrentHashMap<>();

    private final int maxRequests;
    private final long windowMillis;

    public RateLimitInterceptor(
            @Value("${app.rate-limit.max-requests:10}") int maxRequests,
            @Value("${app.rate-limit.window-seconds:60}") int windowSeconds) {

        this.maxRequests = maxRequests;
        this.windowMillis = windowSeconds * 1000L;
    }

    @Override
    public boolean preHandle(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull Object handler) throws IOException {

        if (!"POST".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        long now = System.currentTimeMillis();

        Window window = windows.compute(
                request.getRemoteAddr(),
                (ip, old) ->
                        old == null || now - old.startMillis() >= windowMillis
                                ? new Window(now, 1)
                                : new Window(
                                old.startMillis(),
                                old.count() + 1
                        )
        );

        if (window.count() > maxRequests) {
            response.setStatus(429);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            response.getWriter().write(
                    "{\"status\":429,\"message\":\"Too many requests. Try again later.\"}"
            );

            return false;
        }

        return true;
    }
}
