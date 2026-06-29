import { addProject } from "../app.js";

export function initProjectsDropdown(projects, onSelect) {
  const btn = document.querySelector(".projectsBtn");
  const dropdown = document.querySelector(".projectsDropdown");

  renderDropdown(projects, dropdown, onSelect);

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".projectsCont")) {
      dropdown.classList.add("hidden");
    }
  });
}

export function renderDropdown(projects, dropdown, onSelect) {
  const items = [
    { name: "Default", value: "Default" },
    ...projects.map((p) => ({ name: p.name, value: p.name })),
  ];

  dropdown.innerHTML = `
    ${items.map((p) => `<li data-project="${p.value}">${p.name}</li>`).join("")}
    <li class="new-project-item">
      <input type="text" class="newProjectInput" placeholder="New project..." />
      <button class="newProjectBtn">Add</button>
    </li>
  `;

  // project selection
  dropdown.querySelectorAll("li[data-project]").forEach((li) => {
    li.addEventListener("click", () => {
      dropdown
        .querySelectorAll("li")
        .forEach((l) => l.classList.remove("active"));
      li.classList.add("active");
      onSelect(li.dataset.project);
      dropdown.classList.add("hidden");
    });
  });

  // new project
  const input = dropdown.querySelector(".newProjectInput");
  const addBtn = dropdown.querySelector(".newProjectBtn");

  // stop clicks inside from closing dropdown
  input.addEventListener("click", (e) => e.stopPropagation());
  addBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const name = input.value.trim();
    if (!name) return;
    addProject(name, onSelect);
    input.value = "";
  });

  // submit with Enter
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      const name = input.value.trim();
      if (!name) return;
      addProject(name, onSelect);
      input.value = "";
    }
  });
}
