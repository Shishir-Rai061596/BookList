const BOOKTITLE = document.querySelector('#title'),
    BOOKAUTHOR = document.querySelector('#author'),
    BOOKISBN = document.querySelector('#isbn'),
    FORM = document.querySelector('#book-form'),
    BOOKLIST = document.querySelector('#book-list'),
    CONTAINER = document.querySelector('.container');

FORM.addEventListener('submit', handleBookSubmit);
BOOKLIST.addEventListener('click', (e) => {
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert("Book Removed", "success")
    e.preventDefault()
});

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
};

function handleBookSubmit(e) {
    const ui = new UI();
    if (BOOKTITLE.value === '' || BOOKAUTHOR.value === '' || BOOKISBN.value === '') {
        ui.showAlert("Please fill all the fileds", "error")
    } else {
        const book = new Book(BOOKTITLE.value, BOOKAUTHOR.value, BOOKISBN.value);
        ui.showAlert("Book added succesfully", "success")
        ui.addBookToList(book);
        BOOKTITLE.value = '';
        BOOKAUTHOR.value = '';
        BOOKISBN.value = '';
    }
    e.preventDefault();
}

function UI() {

}

UI.prototype.addBookToList = function (book) {
    const ROW = document.createElement('tr');
    ROW.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`
    BOOKLIST.appendChild(ROW)
}

UI.prototype.showAlert = function (msg, className) {
    const DIV = document.createElement("div");
    DIV.className = `alert ${className}`;
    DIV.appendChild(document.createTextNode(msg));
    CONTAINER.insertBefore(DIV, FORM);
    setTimeout(() => DIV.parentElement.removeChild(DIV), 3000)
}

UI.prototype.deleteBook = function (book) {
    if (book.className === "delete") {

        book.parentElement.parentElement.remove();

    }
}