package com.portifolio.todolist.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portifolio.todolist.dto.TaskCreateUpdateDTO;
import com.portifolio.todolist.model.Priority;
import com.portifolio.todolist.model.Task;
import com.portifolio.todolist.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TaskRepository taskRepository; 

    @Test
    void createTask_whenValid_shouldReturn201() throws Exception {
        TaskCreateUpdateDTO dto = new TaskCreateUpdateDTO(
                "Test Task", "Test Desc", Priority.MEDIUM);

        mockMvc.perform(post("/api/v1/tasks") 
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto))) 
                .andExpect(status().isCreated()) 
                .andExpect(jsonPath("$.id", notNullValue())) 
                .andExpect(jsonPath("$.title", is("Test Task"))) 
                .andExpect(jsonPath("$.completed", is(false)));
    }

    @Test
    void createTask_whenTitleIsBlank_shouldReturn400() throws Exception {
        TaskCreateUpdateDTO dto = new TaskCreateUpdateDTO(
                "T", "Test Desc", Priority.MEDIUM);
        mockMvc.perform(post("/api/v1/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest()) 
                .andExpect(jsonPath("$.validationErrors.title", is("O título deve ter no mínimo 3 caracteres"))); 
    }

    @Test
    void getTaskById_whenNotFound_shouldReturn404() throws Exception {
        long idInexistente = 999L;
        
        mockMvc.perform(get("/api/v1/tasks/" + idInexistente))
                .andExpect(status().isNotFound()) 
                .andExpect(jsonPath("$.message", is("Task not found with id: " + idInexistente))); 
    }

    @Test
    void getTaskById_whenFound_shouldReturn200() throws Exception {
        Task task = new Task();
        task.setTitle("Find Me");
        task.setPriority(Priority.LOW);
        Task taskSalva = taskRepository.save(task);
        Long idExistente = taskSalva.getId();

        mockMvc.perform(get("/api/v1/tasks/" + idExistente))
                .andExpect(status().isOk()) 
                .andExpect(jsonPath("$.id", is(idExistente.intValue())))
                .andExpect(jsonPath("$.title", is("Find Me")));
    }
}