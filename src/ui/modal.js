import { addTodo } from "../app.js";

export function initModal() {
  const overlay = document.getElementById("overlay");
  const addBtn = document.querySelector(".addBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const form = document.getElementById("todoForm");

  addBtn.addEventListener("click", openModal);
  cancelBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));
    addTodo(data);

    form.reset();
    closeModal();
  });
}

export function openModal() {
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("overlay").classList.remove("hidden");
}

export function closeModal() {
  document.getElementById("modal").classList.add("hidden");
  document.getElementById("overlay").classList.add("hidden");
}

export function renderProjectOptions(projects) {
  const select = document.getElementById("project");
  select.innerHTML = projects
    .map((p) => `<option value="${p.name}">${p.name}</option>`)
    .join("");
}
