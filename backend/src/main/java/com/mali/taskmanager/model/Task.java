package com.mali.taskmanager.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tasks")
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String status; // PENDING, IN_PROGRESS, DONE

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
