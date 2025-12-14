/* DATA (SOURCE OF TRUTH) */
const myLibrary = []; //stores all books

/* BOOK CONSTRUCTOR */
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();  //Gives every book a unique & permanent ID
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

/* PROTOTYPE METHOD */
Book.prototype.toggleRead = function () {
  this.read = !this.read; //changes the book’s internal state
};

/* DATA LOGIC */
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read); //Creates a book
  myLibrary.push(newBook);  //Stores book in arr
}

/* DOM REFERENCES */
const libraryDiv = document.querySelector(".library");
const form = document.getElementById("bookForm");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readCheckbox = document.getElementById("read");

const dialog = document.getElementById("bookDialog");
const newBookBtn = document.getElementById("newBookBtn");
const cancelBtn = document.getElementById("cancelBtn");

/* DISPLAY FUNCTION (DOM ONLY) */
function displayBooks() {
  libraryDiv.innerHTML = "";  //Clears UI

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book");
    card.dataset.id = book.id;  //Links DOM ↔ JavaScript object

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read ? "Read" : "Not Read"}</p>
      <button class="toggle">Toggle Read</button>
      <button class="remove">Remove</button>
    `;

    libraryDiv.appendChild(card);
  });
}

/* FORM HANDLING */
form.addEventListener("submit", (e) => {
  e.preventDefault();  //Stops page reload

  addBookToLibrary(  //Updates data
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readCheckbox.checked
  );

  displayBooks();  //UI reflects new data
  form.reset();  //Clears input
  dialog.close();
});

/* BUTTON EVENTS (DELEGATION) */
libraryDiv.addEventListener("click", (e) => {
  const card = e.target.closest(".book");
  if (!card) return;

  const bookId = card.dataset.id;
  const book = myLibrary.find(b => b.id === bookId);

  if (e.target.classList.contains("remove")) {
    myLibrary.splice(myLibrary.indexOf(book), 1);  //Remove book
  }

  if (e.target.classList.contains("toggle")) {
    book.toggleRead();
  }

  displayBooks();
});

/* DIALOG CONTROLS */
newBookBtn.addEventListener("click", () => dialog.showModal());
cancelBtn.addEventListener("click", () => dialog.close());

/* INITIAL TEST DATA */
addBookToLibrary("Atomic Habits", "James Clear", 320, true);
addBookToLibrary("Deep Work", "Cal Newport", 296, false);
displayBooks();
