// store references to DOM elements
const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputField = document.getElementById("inputValue");

const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem("youtube-lists"));
};

const updateTodoListLocalStorage = (localTodoLists) => {
    return localStorage.setItem(
        "youtube-lists",
        JSON.stringify(localTodoLists),
    );
};

const addTodoListDynamically = (curElement) => {
    let createElem = document.createElement("div");
    createElem.classList.add("main_todo_div");
    createElem.innerHTML = `<li>${curElement}</li> <button class="deleteBtn">Delete</button>`;
    mainTodoElem.append(createElem);
};

let localTodoLists = getTodoListFromLocal() || [];

// function to add a new todo item to the DOM
const addTodoList = (e) => {
    // console.log("checking");
    e.preventDefault(); // prevent form submission

    let inputValue = inputField.value.trim();
    inputField.value = ""; // clear input after adding

    if (inputValue !== "" && !localTodoLists.includes(inputValue)) {
        localTodoLists.push(inputValue);
        // localTodoLists = [...new Set(localTodoLists)]; // to avoid duplicate entries, remove duplicates
        addTodoListDynamically(inputValue); // add new todo to DOM list
        console.log(localTodoLists);
        localStorage.setItem("youtube-lists", JSON.stringify(localTodoLists));
    } else {
        alert("This name is already exist!");
    }
};

const showTodoList = () => {
    console.log(localTodoLists);
    localTodoLists.forEach((curElement) => {
        addTodoListDynamically(curElement);
    });
};
showTodoList();

const removeTodo = (e) => {
    e.preventDefault();
    // console.log(e.target.previousElementSibling.innerText);
    targetedTodo = e.target.previousElementSibling.innerText;
    // console.log(targetedTodo);

    localTodoLists = localTodoLists.filter((curTodo) => {
        return curTodo !== targetedTodo;
    });
    console.log(localTodoLists);

    updateTodoListLocalStorage(localTodoLists);

    parentElem = e.target.parentElement;
    parentElem.remove(); // remove targeted todo from DOM
};

mainTodoElem.addEventListener("click", (e) => {
    e.preventDefault(); // prevent default action
    // console.log(e.target.classList.contains("deleteBtn"));
    if (e.target.classList.contains("deleteBtn")) {
        removeTodo(e);
    }
});

// add click event listener to the add-button and call the addTodoList function
document.querySelector(".btn").addEventListener("click", (e) => {
    addTodoList(e);
});


//@ change theme

const themeBtn = document.querySelector("#themeToggle");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }
})