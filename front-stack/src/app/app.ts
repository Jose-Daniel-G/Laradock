import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from './services/task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos módulos para directivas (*ngFor) y formularios
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  tasks: Task[] = [];
  
  // Variables para el formulario de nueva tarea
  newTitle: string = '';
  newDescription: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Llamar al servicio para traer las tareas de Laravel
  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Error al cargar tareas:', err);
      }
    });
  }

  // Guardar una nueva tarea
  saveTask(): void {
    if (!this.newTitle.trim()) return;

    const taskData: Task = {
      title: this.newTitle,
      description: this.newDescription
    };

    this.taskService.createTask(taskData).subscribe({
      next: (createdTask) => {
        this.tasks.push(createdTask); // Agregar la nueva tarea a la lista visual
        this.newTitle = ''; // Limpiar formulario
        this.newDescription = '';
      },
      error: (err) => {
        console.error('Error al crear tarea:', err);
      }
    });
  }
}