package com.mali.taskmanager.controller;

import com.mali.taskmanager.model.Task;
import com.mali.taskmanager.model.User;
import com.mali.taskmanager.repository.TaskRepository;
import com.mali.taskmanager.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskController(TaskRepository taskRepository,
                          UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        System.out.println(SecurityContextHolder.getContext().getAuthentication());
        

    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {

        var auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("AUTH OBJECT: " + auth);

        String email = auth.getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        task.setUser(user);
        task.setStatus("PENDING");

        return taskRepository.save(task);
    }
    	

    @GetMapping
    public List<Task> getUserTasks() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        return taskRepository.findByUser(user);
    }
    
    
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // Ensure user owns the task
        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setStatus(updatedTask.getStatus());

        return taskRepository.save(task);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // Ensure user owns the task
        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        taskRepository.delete(task);

        return "Task deleted successfully";
    }


}


