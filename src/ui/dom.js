import { format, isPast } from "date-fns";
import { toggleTodo } from "../app.js";

export function render(todos, projects) {
  const container = document.querySelector("#app");
  container.innerHTML = "";

  todos.forEach((todo) => {
    const div = document.createElement("div");
    div.classList.add("todo-card");
    if (todo.completed) div.classList.add("completed");

    const overdue = isPast(new Date(todo.dueDate)) && !todo.completed;

    div.innerHTML = `
      <div class="todo-header">
        <h3>${todo.title}</h3>
        <div class="prio-cont"><p>Priority:</p><span class="priority ${todo.priority}">${todo.priority} </span></div>
      </div>
      <p class="desc">${todo.desc}</p>
      <div class="todo-footer">
              <span class="project">${todo.project}</span>
        <span class="due ${overdue ? "overdue" : ""}">
          ${format(new Date(todo.dueDate), "MMM d, yyyy")}
        </span>
        <input type="checkbox" data-id="${todo.id}" ${todo.completed ? "checked" : ""} />
      </div>
    `;
    // toggle expand on header click
    const header = div.querySelector(".todo-header");
    const expanded = div.querySelector(".todo-expanded");
    header.addEventListener("click", (e) => {
      if (e.target.type === "checkbox") return;
      expanded.classList.toggle("hidden");
    });

    // checkbox
    div.querySelector("input[type=checkbox]").addEventListener("change", () => {
      toggleTodo(todo.id);
    });

    //del
    // div.querySelector(".deleteBtn").addEventListener("click", () => {
    //   deleteTodo(todo.id);
    // });

    // edit / save
    // const editBtn = div.querySelector(".editBtn");
    // const saveBtn = div.querySelector(".saveBtn");
    // const fields = div.querySelectorAll(
    //   ".edit-title, .edit-desc, .edit-dueDate, .edit-priority",
    // );

    // editBtn.addEventListener("click", () => {
    //   fields.forEach((f) => f.removeAttribute("disabled"));
    //   editBtn.classList.add("hidden");
    //   saveBtn.classList.remove("hidden");
    // });

    // saveBtn.addEventListener("click", () => {
    //   const updatedData = {
    //     title: div.querySelector(".edit-title").value,
    //     desc: div.querySelector(".edit-desc").value,
    //     dueDate: div.querySelector(".edit-dueDate").value,
    //     priority: div.querySelector(".edit-priority").value,
    //   };
    //   editTodo(todo.id, updatedData);
    // });
    container.appendChild(div);
  });
}
