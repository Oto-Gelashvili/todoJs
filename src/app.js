import { render } from "./ui/dom.js";
import { Todo } from "./models/todo.js";
import { initModal } from "./ui/modal.js";
import {
  saveTodos,
  loadTodos,
  saveProjects,
  loadProjects,
} from "./services/storage.js";

let todos = loadTodos();
let projects = loadProjects();

export function initApp() {
  render(todos, projects);
  initModal();
}

export function addTodo(data) {
  const todo = new Todo(data);
  todos.push(todo);
  saveTodos(todos);
  render(todos, projects);
}

export function getTodos() {
  return todos;
}
export function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(todos);
    render(todos, projects);
  }
}
export function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos(todos);
  render(todos, projects);
}

export function editTodo(id, updatedData) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    Object.assign(todo, updatedData);
    saveTodos(todos);
    render(todos, projects);
  }
}
