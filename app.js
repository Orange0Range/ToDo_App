const newToDo = document.querySelector('#newToDo')
const tasksList = document.querySelector('#tasksList');
const tasks = [];

document.addEventListener("DOMContentLoaded", function(){
    let items = JSON.parse(localStorage.getItem('toDos'))
    if(items){
        items.forEach(i=>{
            create(i);
        })
    }
  })

newToDo.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        e.preventDefault();
        create();
    }
})

tasksList.addEventListener('click',function(e){
    if(e.target.type === 'button'){
        //Remove task from localStorage
        let indexRemove = tasks.findIndex(t => t.task===e.target.parentElement.innerText.split('\n')[0])
        tasks.splice(indexRemove,1)
        if(tasks.length === 0){ //Clear local storage if no tasks exits
            localStorage.clear()
        }
        else{
        localStorage.setItem('toDos', JSON.stringify(tasks));
        }
        //Remove task
        e.target.parentElement.remove();
    }
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle('done')
        tasks.forEach(t => {
            t.task === e.target.innerText.split('\n')[0]? 
                t.class === "" ? 
                    t.class = 'done':
                    t.class = ""
                :""
            })
        localStorage.setItem('toDos', JSON.stringify(tasks));
    }
})

function create(savedTask){
    if(newToDo.value !== "" || savedTask){
    const todo = document.createElement('li');
    if(savedTask){
        todo.textContent = savedTask.task;
        if(savedTask.class){todo.classList.add(savedTask.class)}
        tasks.push({task:savedTask.task, class:savedTask.class});
    }
    else{
        todo.textContent = newToDo.value;
        tasks.push({task:newToDo.value, class:''});
    }
    const todoBtn = document.createElement('button');
    todoBtn.innerHTML = '&#128128';
    todoBtn.type = 'button'
    todo.append(todoBtn);
    tasksList.append(todo);
    newToDo.value = ""
    localStorage.setItem('toDos', JSON.stringify(tasks));
}}
