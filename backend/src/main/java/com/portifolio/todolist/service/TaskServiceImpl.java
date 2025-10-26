package com.portifolio.todolist.service;

import com.portifolio.todolist.dto.TaskCreateUpdateDTO;
import com.portifolio.todolist.dto.TaskResponseDTO;
import com.portifolio.todolist.dto.TaskToggleCompleteDTO;
import com.portifolio.todolist.exception.TaskNotFoundException;
import com.portifolio.todolist.model.Task;
import com.portifolio.todolist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService{
    @Autowired
    private TaskRepository taskRepository;
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    @Transactional
    public TaskResponseDTO createTask(TaskCreateUpdateDTO taskDTO) {
        Task task = new Task();
        task.setTitle(taskDTO.title());
        task.setDescription(taskDTO.description());
        task.setPriority(taskDTO.priority());

        Task savedTask = taskRepository.save(task);

        return convertToResponseDTO(savedTask);
    }

    @Override
    public List<TaskResponseDTO> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponseDTO getTaskById(Long id) {
        Task task = findTaskByIdOrThrow(id);
        return convertToResponseDTO(task);
    }

    @Override
    public TaskResponseDTO updateTask(Long id, TaskCreateUpdateDTO taskDTO) {
        Task task = findTaskByIdOrThrow(id);

        task.setTitle(taskDTO.title());
        task.setDescription(taskDTO.description());
        task.setPriority(taskDTO.priority());

        Task updatedTask = taskRepository.save(task);

        return convertToResponseDTO(updatedTask);
    }

    @Override
    public TaskResponseDTO toggleTaskComplete(Long id, TaskToggleCompleteDTO toggleDTO) {
        Task task = findTaskByIdOrThrow(id);
        task.setComplete(toggleDTO.completed());

        Task updatedTask = taskRepository.save(task);

        return convertToResponseDTO(updatedTask);
    }

    @Override
    public void deleteTask(Long id) {
        Task task = findTaskByIdOrThrow(id);
        taskRepository.delete(task);
    }

    private Task findTaskByIdOrThrow(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }
    private TaskResponseDTO convertToResponseDTO(Task task) {
        return new TaskResponseDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.isComplete(),
                task.getPriority(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }
}
