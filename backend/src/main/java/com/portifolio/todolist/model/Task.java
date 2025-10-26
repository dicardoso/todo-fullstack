package com.portifolio.todolist.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name="tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(nullable = false)
    private boolean complete = false;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Priority priority = Priority.MEDIUM;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreated() {
        createdAt = updatedAt = LocalDateTime.now();
    }

    @PreUpdate void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
