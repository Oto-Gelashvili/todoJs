import { render } from "./ui/dom.js";
import { Todo } from "./models/todo.js";
import { initModal, renderProjectOptions } from "./ui/modal.js";
import { Project } from "./models/project.js";
import { renderDropdown } from "./ui/projectsDropdown.js";

import { initProjectsDropdown } from "./ui/projectsDropdown.js";

import {
  saveTodos,
  loadTodos,
  saveProjects,
  loadProjects,
} from "./services/storage.js";

let todos = loadTodos();
let projects = loadProjects();
let activeProject = "Default";

export function initApp() {
  initProjectsDropdown(projects, (selected) => {
    activeProject = selected;
    renderFiltered();
  });
  renderProjectOptions(projects);
  renderFiltered();
  initModal();
}

function renderFiltered() {
  const filtered =
    activeProject === "Default"
      ? todos
      : todos.filter((t) => t.project === activeProject);
  render(filtered, projects);
}
export function addTodo(data) {
  const todo = new Todo(data);
  todos.push(todo);
  saveTodos(todos);
  renderFiltered();
}

export function getTodos() {
  return todos;
}
export function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(todos);
    renderFiltered();
  }
}
export function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos(todos);
  renderFiltered();
}

export function editTodo(id, updatedData) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    Object.assign(todo, updatedData);
    saveTodos(todos);
    renderFiltered();
  }
}
export function addProject(name, onSelect) {
  const exists = projects.find((p) => p.name === name);
  if (exists) return;

  const project = new Project(name);
  projects.push(project);
  saveProjects(projects);

  const dropdown = document.querySelector(".projectsDropdown");
  renderDropdown(projects, dropdown, onSelect);
  renderProjectOptions(projects);

  activeProject = name;
  renderFiltered();
}
