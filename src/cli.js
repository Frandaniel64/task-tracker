const { program } = require('commander');
const { addTask, listTasks, updateTask, deleteTask, updateTaskStatus } = require('./services/taskService');

// Definir los comandos CLI
program
  .command('add <title>')
  .description('Add a new task')
  .action((title) => {
    addTask(title);
  });

program
  .command('list [status]')
  .description('List all tasks or tasks by status (todo, in-progress, done)')
  .action((status) => {
    listTasks(status);
  });

program
  .command('update <id> <newTitle>')
  .description('Update task title')
  .action((id, newTitle) => {
    updateTask(id, newTitle);
  });

program
  .command('delete <id>')
  .description('Delete a task by ID')
  .action((id) => {
    deleteTask(id);
  });

program
  .command('mark-in-progress <id>')
  .description('Mark task as in progress')
  .action((id) => {
    updateTaskStatus(id, 'in-progress');
  });

program
  .command('mark-done <id>')
  .description('Mark task as done')
  .action((id) => {
    updateTaskStatus(id, 'done');
  });

// Procesar los argumentos de la CLI
program.parse(process.argv);
