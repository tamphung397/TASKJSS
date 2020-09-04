//define UI  Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
//  const icon = document.getElementsByClassName("delete-item secondary-content");
//  console.log(icon);
// load add event
loadEventListeners();

// Load all event listeners
document.addEventListener("DOMContentLoaded", getTasks);

function loadEventListeners() {
    // DOM Load Event

    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);

    // clear task

    clearBtn.addEventListener("click", clearTask);

    //Filter taskEvent

    filter.addEventListener("keyup", filtertasks);
}

//  function deleteTask() {
//      icon.addEventListener('click', function deleteOneTask(e) {
//          console.log("a");
//      });
//  }

//Get Task

function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task) {

        // Create li element
        const li = document.createElement("li");
        li.className = "collection-item";

        // Create text node and append to li
        li.appendChild(document.createTextNode(task));

        //Create new link element
        const link = document.createElement("a");
        //Add class
        link.className = "delete-item secondary-content";

        // add icon html
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        //  link.createTextNode('<i class = "fa fa-remove"></i>')
        // append the link to li
        li.appendChild(link);
        //  console.log(li);
        console.log(task);
        //append li to ul;
        taskList.appendChild(li);
    });

}

//Add task

function addTask(e) {
    if (taskInput.value === "") {
        alert("not null");
        return;
    }

    // Create li element
    const li = document.createElement("li");
    li.className = "collection-item";

    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    //Create new link element
    const link = document.createElement("a");
    //Add class
    link.className = "delete-item secondary-content";

    // add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //  link.createTextNode('<i class = "fa fa-remove"></i>')
    // append the link to li
    li.appendChild(link);
    li.style.setProperty('--animate-duration', '0.5s');
    //  console.log(li);

    //append li to ul;
    taskList.appendChild(li);
    // storage in LS
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = "";

    console.log(taskList.firstChild);
    e.preventDefault();
}
//Store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks)); // send back to local store
}

// remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();

            //Remove from LS
            removeTaskFromLS(e.target.parentElement.parentElement);
        }
    }
}

//clear task
function clearTask(e) {
    //  taskList.innerHTML = '';
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
        // console.log(taskList.firstChild);
    }

    //clear from local storage
    clearLocalStorage();

}

// Filter tasks
function filtertasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(function(task) {
        const item = task.firstChild.textContent;
        // console.log(item);
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}

//Remove from LS
function removeTaskFromLS(taskitem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index) {
        if (taskitem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}
// Clear from Local storage
function clearLocalStorage() {
    localStorage.clear();
}