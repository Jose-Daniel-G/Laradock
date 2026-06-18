import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from './services/task';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Sidebar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  tasks: Task[] = [];
  newTitle: string = '';
  newDescription: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => { this.tasks = data; },
      error: (err) => { console.error('Error al cargar tareas:', err); }
    });
  }

  saveTask(): void {
    if (!this.newTitle.trim()) return;
    const taskData: Task = { title: this.newTitle, description: this.newDescription };
    this.taskService.createTask(taskData).subscribe({
      next: (createdTask) => {
        this.tasks.push(createdTask);
        this.newTitle = '';
        this.newDescription = '';
      },
      error: (err) => { console.error('Error al crear tarea:', err); }
    });
  }
}