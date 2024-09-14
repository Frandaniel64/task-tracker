const Task = require('../models/task');
const { loadTasks, saveTasks } = require('../utils/fileUtils');

/**
 * Agrega una nueva tarea al archivo tasks.json.
 * @param {string} title - El título de la nueva tarea.
 */
function addTask(title) {
  const tasks = loadTasks(); // Carga las tareas existentes desde el archivo JSON.
  const newTask = new Task(tasks.length + 1, title); // Crea una nueva tarea con un ID único y estado "todo".
  tasks.push(newTask); // Añade la nueva tarea a la lista de tareas.
  saveTasks(tasks); // Guarda la lista de tareas actualizada en el archivo JSON.
  console.log(`Task added successfully (ID: ${newTask.id})`); // Muestra un mensaje de confirmación.
}

/**
 * Lista todas las tareas o las tareas con un estado específico.
 * @param {string|null} status - Estado de las tareas a listar (todo, in-progress, done). Si es null, lista todas las tareas.
 */
function listTasks(status = null) {
  const tasks = loadTasks(); // Carga todas las tareas desde el archivo JSON.
  const filteredTasks = status ? tasks.filter(task => task.status === status) : tasks; // Filtra las tareas por estado si se proporciona.
  
  if (filteredTasks.length === 0) {
    console.log('No tasks found.'); // Si no hay tareas, muestra un mensaje de "No tasks found".
  } else {
    filteredTasks.forEach(task => {
      console.log(`${task.id}. [${task.status}] ${task.title}`); // Muestra cada tarea en formato "ID. [status] title".
    });
  }
}

/**
 * Actualiza el título de una tarea existente.
 * @param {number} id - El ID de la tarea a actualizar.
 * @param {string} newTitle - El nuevo título de la tarea.
 */
function updateTask(id, newTitle) {
  const tasks = loadTasks(); // Carga todas las tareas desde el archivo JSON.
  const task = tasks.find(t => t.id === parseInt(id)); // Busca la tarea por su ID.
  
  if (!task) {
    console.log('Task not found.'); // Si la tarea no se encuentra, muestra un mensaje.
    return;
  }

  task.title = newTitle; // Actualiza el título de la tarea.
  saveTasks(tasks); // Guarda la lista de tareas actualizada en el archivo JSON.
  console.log(`Task ${id} updated successfully.`); // Muestra un mensaje de confirmación.
}

/**
 * Elimina una tarea existente por su ID.
 * @param {number} id - El ID de la tarea a eliminar.
 */
function deleteTask(id) {
  let tasks = loadTasks(); // Carga todas las tareas desde el archivo JSON.
  tasks = tasks.filter(task => task.id !== parseInt(id)); // Filtra las tareas y elimina la tarea con el ID dado.
  
  saveTasks(tasks); // Guarda la lista de tareas actualizada en el archivo JSON.
  console.log(`Task ${id} deleted successfully.`); // Muestra un mensaje de confirmación.
}

/**
 * Actualiza el estado de una tarea existente.
 * @param {number} id - El ID de la tarea a actualizar.
 * @param {string} status - El nuevo estado de la tarea (todo, in-progress, done).
 */
function updateTaskStatus(id, status) {
  const tasks = loadTasks(); // Carga todas las tareas desde el archivo JSON.
  const task = tasks.find(t => t.id === parseInt(id)); // Busca la tarea por su ID.
  
  if (!task) {
    console.log('Task not found.'); // Si la tarea no se encuentra, muestra un mensaje.
    return;
  }

  task.status = status; // Actualiza el estado de la tarea.
  saveTasks(tasks); // Guarda la lista de tareas actualizada en el archivo JSON.
  console.log(`Task ${id} marked as ${status}.`); // Muestra un mensaje de confirmación.
}

module.exports = {
  addTask,
  listTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
