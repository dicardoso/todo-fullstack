package com.portifolio.todolist.dto;

import com.portifolio.todolist.model.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record TaskCreateUpdateDTO(
   @NotBlank(message = "O título é obrigatório")
   @Size(min = 3, message = "O título deve ter no mínimo 3 caracteres")
   String title,
   String description,
   @NotNull(message = "A prioridade é obrigatória")
   Priority priority
) {}
