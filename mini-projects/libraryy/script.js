const addBtn = document.getElementById("addBtn");
const modal = document.getElementById("modal");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");
const list = document.getElementById("list");

function clearForm() {
    document.getElementById("bookName").value = "";
    document.getElementById("author").value = "";
    document.getElementById("read").checked = false;
}

addBtn.addEventListener('click', () => {
    modal.style.display = "flex";  // show modal
});

cancelBtn.addEventListener('click', () => {
    modal.style.display = "none"; // ← JUST CLOSES POPUP
    clearForm(); // ← clears previous input
});

saveBtn.addEventListener('click', () => {
    const book = document.getElementById("bookName").value;
    const author = document.getElementById("author").value;
    const read = document.getElementById("read").checked ? "Read" : "Not Read";

    // ---- REQUIRED FIELD CHECK ----
    if (!bookName || !author) {
        alert("Please fill both Book Name and Author");
        return; // stop here
    }

    const item = document.createElement("p");
    item.textContent = `< BOOK:- ${book} , AUTHOR:- ${author} , STATUS:- ${read} >`;
    list.appendChild(item);

    modal.style.display = "none";  // hide modal
    clearForm(); // ← clears previous input
});
