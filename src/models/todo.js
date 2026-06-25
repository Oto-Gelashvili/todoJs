export class Todo {
  constructor({ title, desc, dueDate, priority, project = "Default" }) {
    this.id = crypto.randomUUID();

    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;

    this.project = project;

    this.completed = false;

    this.createdAt = new Date();
  }
}
