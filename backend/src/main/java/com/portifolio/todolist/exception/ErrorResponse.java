package com.portifolio.todolist.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorResponse(
        int statusCode,
        String message,
        Map<String, String> validationErrors,
        LocalDateTime timestamp
) {
    public ErrorResponse(int statusCode, String message, LocalDateTime timestamp) {
        this(statusCode, message, null, timestamp);
    }
}
