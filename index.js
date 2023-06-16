const userContainer = document.getElementById('taskList');
const successMessage = document.getElementById('successMessage');
const addBtn = document.getElementById('add');
const deleteBtn = document.getElementById('button2');
const taskIdInput = document.getElementById('taskId');

const getTodoById = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${userId}`);
    const todo = await response.json();
    return todo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const displayTodo = async (userId) => {
  const todo = await getTodoById(userId);
  if (todo) {
    let li = document.createElement('li');
    let userName = document.createElement('input');
    let checkbox = document.createElement('input');
    let deleteBtn = document.createElement('button');
    let gap = document.createElement('span');

    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    userName.value = todo.todo;
    userName.style.width = '300px';
    userName.style.height = '100px;'


    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        userName.style.textDecoration = 'line-through';
      } else {
        userName.style.textDecoration = 'none';
      }
    });

    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      deleteTodoById(userId);
      li.remove();
    });

    gap.style.marginRight = '10px';

   

    li.appendChild(checkbox);
    li.appendChild(userName);
    li.appendChild(deleteBtn);
    li.setAttribute('key', userId);
    li.setAttribute('class', 'task');
    userContainer.appendChild(li);
  } 
  else {
    console.log(`Todo with user ID ${userId} not found.`);
  }
};

const deleteTodoById = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${userId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteTasks = () => {
  const tasks = document.getElementsByClassName('task');
  while (tasks.length > 0) {
    tasks[0].remove();
  }
};

addBtn.addEventListener('click', () => {
  const userId = parseInt(taskIdInput.value);
  if (!isNaN(userId)) {
    displayTodo(userId);
    successMessage.textContent = 'Todo added successfully.';
  } else {
    successMessage.textContent = 'Please enter a valid User ID.';
  }

});

deleteBtn.addEventListener('click', deleteTasks);




