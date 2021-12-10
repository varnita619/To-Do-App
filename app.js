const clear = document.querySelector(".clear");
const dateElement = document.querySelector("#date");
const list = document.querySelector("#list");
const input = document.querySelector("#input");

// class names for adding class to check/uncheck button

const check = "fa-check-circle";
const unCheck = "fa-circle-thin";
const line_through = "lineThrough";

// to store all the to-do items

let List, id;

// restore/get item (to-do) from localstorage

let data = localStorage.getItem("TODO");

//  Check if data is not empty
if (data) {
    List = JSON.parse(data);
    id = List.length; //set the id of the item by increasing the id from the last item 
    loadList(List);
}
else {
    // if data isn't empty
    List = [];
    id = 0;
}

// loads items to user interface
function loadList(array) {
    array.forEach((item) => {
        addToDo(item.name, item.id, item.done, item.trash);
    })
}

// clear localstorage

clear.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})

// showing today's date

let options = { weekday: 'long', month: 'short', day: 'numeric' };
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-Us", options);


// Add item in our to-do list

function addToDo(toDo, id, done, trash) {

    if (trash) {
        return;
    }

    const Done = done ? check : unCheck;
    const line = done ? line_through : "";
    const text = `<li class="item">
    <i class="fa ${Done} co" job="complete" id="${id}"></i>
    <p class="text ${line}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>`

    const position = "beforeend";

    list.insertAdjacentHTML(position, text);
}

// adding the element to the list as the user press the enter key

document.addEventListener("keyup", function (even) {
    if (event.keyCode === 13) {
        const toDo = input.value;

        // if to-do is not empty
        if (toDo) {
            addToDo(toDo, id, false, false);

            List.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            });

            // save to-do in localstorage(this code should be added everywhere the List array is updated)

            localStorage.setItem("TODO", JSON.stringify(List));

            id++;
        }
        input.value = "";

    }
})

// to-do in done

function completeToDo(element) {
    element.classList.toggle(check)
    element.classList.toggle(unCheck);
    element.parentNode.querySelector(".text").classList.toggle(line_through);

    List[element.id].done = List[element.id].done ? false : true;
}

// remove to-do

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    List[element.id].trash = true;
}

// Targeting an element created dynamically

list.addEventListener("click", (event) => {
    let element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob === "complete") {
        completeToDo(element);
    }
    else if (elementJob === "delete") {
        removeToDo(element);
    }

    // save to-do in localstorage(this code should be added everywhere the List array is updated)

    localStorage.setItem("TODO", JSON.stringify(List));
});




