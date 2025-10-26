package com.portifolio.todolist.dto;

import jakarta.validation.constraints.NotNull;

public record TaskToggleCompleteDTO(
        @NotNull(message = "O status 'completed' é obrigatório")
        Boolean completed
) {}