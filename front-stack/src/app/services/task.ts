import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

// Definimos una interfaz para tipar los datos que vienen de Laravel
export interface Task {
  id?: number;
  title: string;
  description?: string;
  status?: 'pending' | 'completed';
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // URL de tu API en Laragon
  private apiUrl = environment.apiUrl + '/tasks';

  constructor(private http: HttpClient) { }

  // Obtener todas las tareas
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Crear una nueva tarea
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
}