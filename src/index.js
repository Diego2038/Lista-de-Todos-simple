// import { saludar } from './js/componentes';
// saludar( 'Fernando');

import './styles.css';
// import { Todo } from './classes/todo.class'; // no es necesario poner el .js, y dentro de los { } exportas todas las clases (o funciones)
// import { TodoList } from './classes/todo-list.class';

import { Todo, TodoList } from './classes';
import { crearTodoHTML } from './js/componentes';
import { } from './js/eliminarxd'; 

localStorage.setItem('mi-key','ABC123');
setTimeout(() => {
  localStorage.removeItem('mi-key');
},2000);

export const todoList = new TodoList();
todoList.todos.forEach( ( todo ) => {
  crearTodoHTML( todo );
}); 

// const nuevoTodo = new Todo('Bailar Tap');
// todoList.agregarTodo( nuevoTodo );
// console.log(todoList.todos);