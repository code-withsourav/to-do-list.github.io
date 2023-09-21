const addButton = document.querySelector(".add-task");
const taskInput = document.querySelector(".search-box input");
const taskContainer = document.querySelector("#tasks");
const error = document.getElementById("#empty-task");
const count = document.querySelector(".count");

// to keep track of number of task - this variable will be added/deleted or checked
let countTask = 0;

// this fn takes countTask as input and updates the text content of an element with class count

// this is called to display current count of task
const countDisplay = (countTask) => {
    count.innerText = countTask;
};

// executed when the add buttone is clicked
const addTask = () => {
    // retrieve the value entered in the taskInput/search-box and store it in taskName
    const taskName = taskInput.value.trim();

    // hide any previous error message
    // error.style.display="none";

    // check if task name var is empty or contains only white space
    if(!taskName){
        alert("Please enter some text to add the task");
        return;
    }

    // if taskName is not empty we proceed to create new task element

    // a input checkbox is created
    const task = `<div class="task">
    
        <input type="checkbox" class="check-task">
        <span class="taskname">${taskName}</span>
        
        <button class="edit">
        Edit
        </button>

        <button class="delete">
        Delete
        </button>

    </div>`;

    // insert task element into the task container as beforeend, this will adds the task at the end of the container, it appears below existing task 
    taskContainer.insertAdjacentHTML("beforeend", task);

    //select all the delete buttons 
    const delButton = document.querySelectorAll(".delete");

    // iterate over the del button and once it's clicked remove the parent task element from DOM and decrement the task count
    delButton.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
            countTask -=1;
            countDisplay(countTask);
        };
    });

    // similarly for edit button

    const editButton = document.querySelectorAll(".edit");

    editButton.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            // extract the taskName from it's sibbling element i.e. the span containing the taskname & prefill the new taskInput field with extracted name
            let targetElement = e.target;

            if(!(e.target.className == "edit")){
                targetElement = e.target.parentElement; 
            }

            taskInput.value = targetElement.previousElementSibling?.innerText;

            targetElement.parentNode.remove();

            countTask -=1;

            countDisplay(countTask);
        };
    });

    // select all the task checkboxes and assign on change event handlers
    const taskCheck = document.querySelectorAll(".check-task");

    taskCheck.forEach((checkBox) => {checkBox.onchange = () => {
        checkBox.nextElementSibling.classList.toggle("completed");

        if(checkBox.checked){
            countTask -=1;
        }else{
            countTask +=1;
        }
        countDisplay(countTask);
    };
    
    });
    countTask +=1;
    countDisplay(countTask);
    taskInput.value = "";
    
};

// adding event listner to call the fn.
// when users clicks on Add button, addTask fn. will be called

addButton.addEventListener("click", addTask);


// set the onload event handler to initialize the count to zero and reset the new task input field when the page finishes loading

window.onload = () => {
    countTask = 0;
    countDisplay(countTask);
    taskInput.value = "";
};

