const BOOKTITLE = document.querySelector('#title'),
    BOOKAUTHOR = document.querySelector('#author'),
    BOOKISBN = document.querySelector('#isbn'),
    FORM = document.querySelector('#book-form'),
    BOOKLIST = document.querySelector('#book-list'),
    CONTAINER = document.querySelector('.container');

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const ROW = document.createElement('tr');
        ROW.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`
        BOOKLIST.appendChild(ROW);
    }
    clearFields() {
        BOOKTITLE.value = '';
        BOOKAUTHOR.value = '';
        BOOKISBN.value = '';
    }
    showAlert(msg, className) {
        const DIV = document.createElement("div");
        DIV.className = `alert ${className}`;
        DIV.appendChild(document.createTextNode(msg));
        CONTAINER.insertBefore(DIV, FORM);
        setTimeout(() => DIV.parentElement.removeChild(DIV), 3000)
    }
    deleteBook(book) {
        if (book.className === "delete") {
            book.parentElement.parentElement.remove();
        }
    }
}

const ui = new UI();

class Storage {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem("books"))
        }
        return books;
    }
    static addBook(book) {
        const books = Storage.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books))
    }
    static displayBooks() {
        const books = Storage.getBooks();
        books.forEach(book => ui.addBookToList(book))

    }
    static removeBook(isbn) {
        let books = Storage.getBooks();
        books = books.filter(book => book.isbn !== isbn);
        localStorage.setItem("books", JSON.stringify(books))
    }
}

document.addEventListener('DOMContentLoaded', () => Storage.displayBooks())
FORM.addEventListener('submit', handleBookSubmit);
BOOKLIST.addEventListener('click', (e) => {
    ui.deleteBook(e.target);
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent)

    ui.showAlert("Book Removed", "success")
    e.preventDefault()
});

function handleBookSubmit(e) {

    if (BOOKTITLE.value === '' || BOOKAUTHOR.value === '' || BOOKISBN.value === '') {
        ui.showAlert("Please fill all the fileds", "error")
    } else {
        const book = new Book(BOOKTITLE.value, BOOKAUTHOR.value, BOOKISBN.value);
        ui.showAlert("Book added succesfully", "success")
        ui.addBookToList(book);
        Storage.addBook(book);
        ui.clearFields();
    }
    e.preventDefault();
}