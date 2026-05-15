import { render } from "./ui/dom.js";
import { Todo } from "./models/todo.js";

let todos = [];
let projects = [];

export function initApp() {
  render(todos, projects);
}

export function addTodo(data) {
  const todo = new Todo(data);
  todos.push(todo);
  render(todos, projects);
}

export function getTodos() {
  return todos;
}
