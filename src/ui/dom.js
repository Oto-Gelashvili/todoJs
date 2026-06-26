import { format, isPast } from "date-fns";
import { toggleTodo, editTodo, deleteTodo } from "../app.js";

export function render(todos, projects) {
  const container = document.querySelector("#app");
  container.innerHTML = "";

  todos.forEach((todo) => {
    const div = document.createElement("div");
    div.classList.add("todo-card");
    if (todo.completed) div.classList.add("completed");

    const overdue = isPast(new Date(todo.dueDate)) && !todo.completed;

    div.innerHTML = `
      <div class="base-card">
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
      </div>
<form class="todo-expanded hidden">
        <div class="desc-cont">
          <h3>Description</h3>
          <p class="desc">${todo.desc}</p>
        </div>
    <label>
      Title
      <input type="text" name="title" value="${todo.title}" required />
    </label>
    <label>
      Description
      <input type="text" name="desc" value="${todo.desc}" />
    </label>
    <label>
      Due Date
      <input type="date" name="dueDate" value="${todo.dueDate}" required />
    </label>
    <label>
      Priority
      <select name="priority">
        <option value="low" ${todo.priority === "low" ? "selected" : ""}>Low</option>
        <option value="medium" ${todo.priority === "medium" ? "selected" : ""}>Medium</option>
        <option value="high" ${todo.priority === "high" ? "selected" : ""}>High</option>
      </select>
    </label>
    
    <div class="todo-actions">
<span class="material-symbols-outlined deleteBtn">delete</span>

      <div class="actionBtnCont">
        <button type="button" class="cancelBtn">Cancel</button>
        <button type="submit">Save</button>
      </div>
    </div>
  </form>
    `;
    //open
    const expanded = div.querySelector(".todo-expanded");
    div.addEventListener("click", (e) => {
      if (e.target.type === "checkbox") return;
      if (e.target.closest(".todo-expanded")) return;
      expanded.classList.toggle("hidden");
    });

    // checkbox
    div.querySelector("input[type=checkbox]").addEventListener("change", () => {
      toggleTodo(todo.id);
    });

    // cancel
    div.querySelector(".cancelBtn").addEventListener("click", () => {
      expanded.classList.add("hidden");
    });

    // delete
    div.querySelector(".deleteBtn").addEventListener("click", () => {
      deleteTodo(todo.id);
    });

    // save
    expanded.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(expanded));
      editTodo(todo.id, data);
    });
    container.appendChild(div);
  });
}
