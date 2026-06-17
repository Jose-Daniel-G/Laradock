<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // 1. Leer todas las tareas (GET /api/tasks)
    public function index()
    {
        return response()->json(Task::all(), 200);
    }

    // 2. Crear una nueva tarea (POST /api/tasks)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,completed'
        ]);

        $task = Task::create($validated);

        // NOTA: Aquí es donde en el futuro pondremos el Webhook para n8n
        
        return response()->json($task, 201); // 201: Created
    }

    // 3. Ver una tarea específica (GET /api/tasks/{id})
    public function show(Task $task)
    {
        return response()->json($task, 200);
    }

    // 4. Actualizar una tarea (PUT/PATCH /api/tasks/{id})
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,completed'
        ]);

        $task->update($validated);

        return response()->json($task, 200);
    }

    // 5. Eliminar una tarea (DELETE /api/tasks/{id})
    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json(['message' => 'Tarea eliminada correctamente'], 200);
    }
}