const fs = require("fs");
const path = require("path");

// Función para cargar las tareas desde el archivo JSON
function loadTasks() {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([])); // Si no existe, lo crea
  }
  const data = fs.readFileSync(path, "utf-8");
  return JSON.parse(data);
}

// Función para guardar las tareas en el archivo JSON
function saveTasks(tasks) {
  fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
}

module.exports = { loadTasks, saveTasks }; // Exportamos las funciones para poder usarlas en otros archivos
