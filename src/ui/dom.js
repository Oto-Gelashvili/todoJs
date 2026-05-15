import { addTodo } from "../app.js";

export function render(todos, projects) {
  const container = document.querySelector("#app");
  container.innerHTML = "";

  todos.forEach((todo) => {
    const div = document.createElement("div");
    div.textContent = todo.title;

    container.appendChild(div);
  });
}
