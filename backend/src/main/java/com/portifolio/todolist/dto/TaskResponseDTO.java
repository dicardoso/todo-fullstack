package com.portifolio.todolist.dto;

import com.portifolio.todolist.model.Priority;

import java.time.LocalDateTime;

public record TaskResponseDTO(
        Long id,
        String title,
        String description,
        boolean completed,
        Priority priority,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
