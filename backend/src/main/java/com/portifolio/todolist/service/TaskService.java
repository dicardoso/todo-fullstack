package com.portifolio.todolist.service;

import com.portifolio.todolist.dto.TaskCreateUpdateDTO;
import com.portifolio.todolist.dto.TaskResponseDTO;
import com.portifolio.todolist.dto.TaskToggleCompleteDTO;

import java.util.List;

public interface TaskService {
    TaskResponseDTO createTask(TaskCreateUpdateDTO taskDTO);
    List<TaskResponseDTO> getAllTasks();
    TaskResponseDTO getTaskById(Long id);
    TaskResponseDTO updateTask(Long id, TaskCreateUpdateDTO taskDTO);
    TaskResponseDTO toggleTaskComplete(Long id, TaskToggleCompleteDTO toggleDTO);
    void deleteTask(Long id);
}
