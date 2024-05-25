const createBtn = document.querySelector("#createBtn");
const notes = document.querySelector(".notes");

function showNotes (){
   notes.innerHTML = localStorage.getItem("notes") || "";
}
showNotes();
function updateStorage(){
    localStorage.setItem("notes",notes.innerHTML);
}
createBtn.addEventListener("click",()=>{
    let img = document.createElement("img");
    let inputBox =  document.createElement("p");
    img.src="./images/delete.png";
     inputBox.className= "input-box";
     inputBox.setAttribute("contenteditable", "true");
     notes.appendChild(inputBox).appendChild(img);
     updateStorage();
});
notes.addEventListener("click", (e)=>{
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName ==="p"){
        inputBox = document.querySelectorAll(".input-box");
        inputBox.forEach(note => {
           note.onkeyup = function(){
            updateStorage();
           }
        });
    }
})

document.addEventListener("keydown", event=>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})

