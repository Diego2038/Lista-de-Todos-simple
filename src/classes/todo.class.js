
export class Todo {
  
  static fromJson ({ id, tarea, completado, creado}) { 
    const elTodo = new Todo(tarea);
    elTodo.completado = completado;
    elTodo.id = id;
    elTodo.creado = creado; 
    return elTodo;
  }

  constructor( tarea ) {
    this.tarea = tarea;
    this.completado = false;
    this.creado = new Date();
    this.id = new Date().getTime();
  }
}