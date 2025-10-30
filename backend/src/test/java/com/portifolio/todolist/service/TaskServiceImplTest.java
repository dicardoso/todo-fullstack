package com.portifolio.todolist.service;

import com.portifolio.todolist.dto.TaskCreateUpdateDTO;
import com.portifolio.todolist.dto.TaskResponseDTO;
import com.portifolio.todolist.exception.TaskNotFoundException;
import com.portifolio.todolist.model.Priority;
import com.portifolio.todolist.model.Task;
import com.portifolio.todolist.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceImplTest {
    @Mock
    private TaskRepository taskRepository;
    @InjectMocks
    private TaskServiceImpl taskService;

    @Test
    void createTask_shouldSaveAndReturnDTO() {
        TaskCreateUpdateDTO dto = new TaskCreateUpdateDTO(
                "Teste", "Desc Teste", Priority.HIGH
        );
        Task taskSaved = new Task();
        taskSaved.setId(1L);
        taskSaved.setTitle("Teste");
        taskSaved.setDescription("Desc Teste");
        taskSaved.setPriority(Priority.HIGH);
        taskSaved.setCreatedAt(LocalDateTime.now());
        taskSaved.setUpdatedAt(LocalDateTime.now());

        when(taskRepository.save(any(Task.class))).thenReturn(taskSaved);

        TaskResponseDTO response = taskService.createTask(dto);

        assertThat(response).isNotNull();
        assertThat(response.id()).isEqualTo(1L);
        assertThat(response.title()).isEqualTo(dto.title());
        assertThat(response.description()).isEqualTo(dto.description());
        assertThat(response.priority()).isEqualTo(dto.priority());

        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void getTaskById_whenNotFound_shouldThrowException() {
        Long idNonexistent = 99L;

        when(taskRepository.findById(idNonexistent)).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> taskService.getTaskById(idNonexistent));

        verify(taskRepository, times(1)).findById(idNonexistent);
    }
}
