//Code your solution here
const listUl = document.querySelector('#main-list-tasks')
const selectBox = document.querySelector('#list-select')
const listName = document.querySelector('#main-list-name')
const mainListTasks = document.querySelector('#main-list-tasks')
const formContainer = document.querySelector("#task-form-container")


renderListOptions()
//Fetches!
function fetchLists(){
    return fetch('http://localhost:3000/lists')
        .then(resp => resp.json())
}

function fetchIndividualList(e){
    return fetch(`http://localhost:3000/lists/${e.target.value}`)
        .then(resp => resp.json())
}

function checkedFetch(task){
    task.done = !task.done
    const configObj = {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            done: task.done
        })
    }
    return fetch(`http://localhost:3000/tasks/${task.id}`, configObj)
        .then(resp => resp.json())
}

function newTaskFetch(json, e){
    const bodyObj = {
        name: e.target['task-name'].value,
        done: false,
        list_id: json.id
    }
    const configObj = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(bodyObj)
    }
    return fetch(`http://localhost:3000/tasks`, configObj)
        .then(resp => resp.json())
}


//Render stuff on page


function renderListOptions(){
    fetchLists().then(json=> json.forEach(addListToSelect))
}  


function addListToSelect(list){
    let listOption = document.createElement('option')
    listOption.innerText = list.name
    listOption.value = list.id
    selectBox.append(listOption)
}

selectBox.addEventListener('change',e=>{
    fetchIndividualList(e).then(json =>{
        mainListTasks.innerHTML = ''
        listName.textContent = `${json.name} - ${json.priority}`
        formContainer.innerHTML = `
        <form id="new-task-form">
            <label for="task-name">Task Name:</label>
            <input type="text" id="task-name" >
            <input type="submit" value="Create new Task">
        </form>`
        const taskForm = formContainer.querySelector('#new-task-form')
        taskForm.addEventListener('submit', e=>{
            e.preventDefault()
            newTaskFetch(json, e).then(renderTask)
        })
        json.tasks.forEach(renderTask)
    })
})

function renderTask(task){
    let taskLi = document.createElement('li')
    taskLi.classList.add( "list-group-item", "d-flex", "justify-content-between", "align-items-center")
    taskLi.innerHTML = `${task.name} <input type="checkbox" ${task.done ? 'checked': ''} class="task-checkbox">`
    let checkbox = taskLi.querySelector('input')
    checkbox.addEventListener('change', e=>{
        checkedFetch(task)
    })
    mainListTasks.append(taskLi)
}