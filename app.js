const clear = document.querySelector(".clear");
const dateElement = document.querySelector("#date");
const list = document.querySelector("#list");
const input = document.querySelector("#input");

// Add item in our to-do list

function addToDo(toDo){
    const text = `<li class="item">
    <i class="fa fa-circle-thin co" job="complete" id="0"></i>
    <p class="text">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="0"></i>
    </li>`

    const position = "beforeend";

    list.insertAdjacentHTML(position, text);
}

// adding the element to the list as the user press the enter key

document.addEventListener("keyup",function(even){
    if(event.keyCode === 13){
        const toDo = input.value;

        if(toDo){
            addToDo(toDo)
        }
        input.value = "";
    }
})