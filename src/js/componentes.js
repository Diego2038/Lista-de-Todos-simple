import { Todo, TodoList } from '../classes/index';

// Referencias al HTML
const divTodoList = document.querySelector('.todo-list');

export const crearTodoHTML = ( todo ) => {
    const htmlTodo = `<li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
                        <div class="view">
                            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
                             <label>${ todo.tarea }</label>
                         <button class="destroy"></button>
                        </div>
                        <input class="edit" value="Create a TodoMVC template">
                    </li>`;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstChild);

    return div;

}

/////


// Referencias al HTML
const todoList = new TodoList();
const botonAgregarTodo = document.querySelector('label');
const todoTextoEntrada = document.querySelector('.new-todo');

// console.log(todoTextoEntrada);


botonAgregarTodo.addEventListener('click', () => {
  if (todoTextoEntrada.value.length > 1) {
    const todoX = new Todo(todoTextoEntrada.value);
    todoList.agregarTodo(todoX);
    crearTodoHTML(todoX)
    // console.log(todoX.tarea);
    // console.log({todoList});
    todoTextoEntrada.value = '';
  };
});

todoTextoEntrada.addEventListener('keyup', (e) => {
  if ( e.key === 'Enter' ) {
    botonAgregarTodo.click();
    todoTextoEntrada.focus();
  }
});


//////

divTodoList.addEventListener('click' , (event) => {
    const nombreElemento = event.target.localName; // input, label, ó button
    const todoElemento = event.target.parentElement.parentElement; // este es el li, cuando lo undes viene desde el label (y hay que "escalar" hasta el li)
    const todoId = todoElemento.getAttribute('data-id'); // extrae el valor del atributo del li 
    
    if ( nombreElemento.includes('input')) {
        todoList.marcarCompletado( todoId ); // se le modifica desde la parte lógica
        todoElemento.classList.toggle('completed');
    } else if ( nombreElemento.includes('button')) {
      todoList.eliminarTodo( todoId ); // lo elimina desde la parte lógica
      divTodoList.removeChild( todoElemento ); // Elimina la parte del HTML
    } 
});


//////
const botonEliminarTodosLosCompletados = document.querySelector('.clear-completed');

botonEliminarTodosLosCompletados.addEventListener('click', () => {
  todoList.eliminarCompletados();
  
  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];
    // console.log(elemento);
    if(elemento.classList.contains('completed')) {
      divTodoList.removeChild( elemento ); 
    }
  } 

  // console.log('>>>' , {todoList});
});


/////
const botonFilter = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

/*
const quitarSeleccionActivada = (ul) => {
  for( let il of ul) {
    il.children[0].classList.remove('selected');
  } 
};
*/

botonFilter.addEventListener('click', (event) => { 
  const filtro = event.target.text; // Todos, Pendientes, Completados
  if(!filtro) return; // De esta manera los undefined terminarán el evento de inmediato, y no habrán errores
  
  for(const elemento of divTodoList.children){
    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');
    switch(filtro){
      case 'Pendientes':
        if(completado) elemento.classList.add('hidden');
        break; 
      case 'Completados':
        if(!completado) elemento.classList.add('hidden');
        break;  
    }
  }

  // El forEach sólo funciona para arreglos
  anchorFiltros.forEach( (element) => {element.classList.remove('selected')}); // Borra la clase selected a todos los elementos
  event.target.classList.add('selected'); 

  /*
  quitarSeleccionActivada(botonFilter.children);
  if (filtro.includes('Todos')){
    console.log('11');
    botonFilter.children[0].children[0].classList.add('selected');
  } else if (filtro.includes('Pendientes')) {
    console.log('2');
    botonFilter.children[1].children[0].classList.add('selected');
  } else if ( filtro.includes('Completados') ) {
    console.log('3');
    botonFilter.children[2].children[0].classList.add('selected');
  }
  */
});
