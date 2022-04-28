let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
  let addTask = document.getElementById("addTask");
  let notes = localStorage.getItem("notes");
  let notesObj;
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTask.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTask.value = "";
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="alert alert-info alert-dismissible fade show" role="alert">    
            <strong>${element}</strong>
            <button type="button" id="${index}" onclick="deleteNode(this.id)" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>    
        `;
  });
  let notesElm = document.getElementById("todoList");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Add first note`;
  }
}

function deleteNode(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

showNotes();

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let notesCard = document.getElementsByClassName("alert");
  Array.from(notesCard).forEach(function (element) {
    let cardTitle = element.getElementsByTagName("h5")[0].innerText;
    if (cardTitle.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
