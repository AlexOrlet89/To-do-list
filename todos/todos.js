import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();
displayTodos();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

todoForm.addEventListener('submit', async(e) => {
    // on submit, create a todo, reset the form, and display the todos
    e.preventDefault();
    const todo = (todoForm.todo.value);
    await createTodo(todo);
    await displayTodos();
});

async function displayTodos() {
    console.log(`getTodos`);
    // clear todosEl
    todosEl.innerHTML = '';
    // fetch the todos
    const todos = await getTodos();
    console.log(todos);
    // display the list of todos
    for (let todo of todos) {
        const task = renderTodo(todo);
        task.addEventListener('click', () => {
            task.classList.add('complete');
        });
        todosEl.append(task);
    }
    // be sure to give each todo an event listener

    // on click, complete that todo
}

// add an on load listener that fetches and displays todos on load

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async() => {
    // delete all todos
    deleteAllTodos();
    displayTodos();
    // then refetch and display the updated list of todos
});
