//1 Definition of UI Vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//2 load all Event listeners
loadEventListeners();

//3load the loadEventListener
function loadEventListeners() {
    //24 DOM load event
    document.addEventListener("DOMContentLoaded", getTasks);
    //4 add event/task
    form.addEventListener("submit", addTask, addTime);
    //16 Remove event/task
    taskList.addEventListener("click", removeTask);
    //18 Clear task events
    clearBtn.addEventListener("click", clearTasks)
    //20 Filter task
    filter.addEventListener("keyup", filterTasks)


}

//25 Get task from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

    tasks.forEach(function (task) {
        //7 creating li element
        const li = document.createElement("li");
        //8 adding a class to the list item
        li.className = "collection-item";
        //9 create text node and append to li
        li.appendChild(document.createTextNode(task));
        //10 creating a new link
        const link = document.createElement("a");
        const paragraph = document.createElement("p");
        //11 add class to element
        link.className = "delete-item secondary-content";
        //12 adding the delete 
        link.innerHTML = "<i class='fa fa-remove'><i/>";
        //13 append link to the li
        li.appendChild(link);

        // paragraph.className = "";
        // paragraph.innerHTML = document.getElementById;
        // li.appendChild(paragraph);

        //14  Append li to ui
        taskList.appendChild(li);

    })
}

function gTask(){
    //7 creating li element
    const li = document.createElement("li");
    //8 adding a class to the list item
    li.className = "collection-item";
    //9 create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //10 creating a new link
    const link = document.createElement("a");
    //11 add class to element
    link.className = "delete-item secondary-content";
    //12 adding the delete 
    link.innerHTML = "<i class='fa fa-remove'><i/>";
    //13 append link to the li
    li.appendChild(link);

    //14  Append li to ui
    taskList.appendChild(li);
}

//5 addTask function
function addTask(e) {
    //6 quick validation
    if (taskInput.value === "") {
        alert("Please enter a Task");
    }
    
    //22 Storing in  LOCAL STORAGE
    storeTaskInLocalStorage(taskInput.value);
    getTasks();
    //15 clearing iput after each task have been added
    taskInput.value = "";

    e.preventDefault();
}

//23 Store task FUNCTION
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//27 Remove task from local storage FUNCTION
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//17 remove task event FUNCTION
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are You Sure???")) {
            e.target.parentElement.parentElement.remove();

            //26 Remove task form LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

//19 ClearTask FUNCTION
function clearTasks() {
    if (confirm("Do you want to clear All Task???")) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }

    //28 Clear from local storage
    clearTasksFromLocalStorage();

}

//29 Clear task from local storage FUNCTION
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//21 filtertask FUNCTION
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach
        (function (task) {
            const item = task.firstChild.textContent;
            if (item.toLocaleLowerCase().indexOf(text) != -1) {
                task.style.display = "block";
            } else {
                task.style.display = "none";
            }

        }
        );
}

// hiding the Date and time on load
document.querySelector("#dateTime").style.display = "none";



//clicking the reminder button calls the function
// document.querySelector("#checkbox").onclick = function () {
//     // check("checkbox");
//     if(this.checked) {
//         document.querySelector("#dateTime").style.display = "block";
//     }
//     else{
//         document.querySelector("#dateTime").style.display = "none";
//     }
// }


//addTime FUNCTION
function addTime() {

    // Set the date we're counting down to
    var countDownDate = new Date("april 8, 2029 20:14:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();
        
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
        
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
        
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("audio").play();
        alert("expired")
    }
    }, 1000);
}