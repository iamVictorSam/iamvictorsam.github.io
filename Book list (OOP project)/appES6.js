//01 book 
class Book {

    constructor(title, author, isbn) {

        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }

}

//02 UI
class UI {
    //03 
    addBookToList(book) {
        const list = document.getElementById("book-list");
        // Create tr element
        const row = document.createElement("tr");

        // create td title element
        const tdTitle = document.createElement("td");
        // create td author element
        const tdAuthor = document.createElement("td");
        // create td isbn element
        const tdIsbn = document.createElement("td");
        // create td action element
        const tdAction = document.createElement("td");

        tdTitle.innerHTML = book.title;
        tdAuthor.innerHTML = book.author;
        tdIsbn.innerHTML = book.isbn;
        tdAction.innerHTML = '<a href="#" class="delete">X<a>';

        row.appendChild(tdTitle);
        row.appendChild(tdAuthor);
        row.appendChild(tdIsbn);
        row.appendChild(tdAction);

        //10 Insert colomns
        // row.innerHTML = `
        // <td>${book.title}<td/>
        // <td>${book.author}<td/>
        // <td>${book.isbn}<td/>
        // <td><a href="#" class="delete">X<a><td/>`;

        list.appendChild(row)

    }

    //04
    showAlert(message, className) {
        // Create div
        const div = document.createElement("div");
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector(".container");
        // Get form
        const form = document.querySelector("#book-form")
        // Insert alert
        container.insertBefore(div, form)

        // Timeout after 3sec
        setTimeout(function () {
            document.querySelector(".alert").remove();
        }, 3000);
    }

    //05
    deleteBook(target) {
        if (target.className === "delete") {
            target.parentElement.parentElement.remove();
        }
    }

    //06
    clearFields() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }
}

//99 Local store class
class Store {
    static getbooks() {
        let books;
        if(localStorage.getItem("books") === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem("books"))
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getbooks();

        books.forEach(function(book) {
            const ui = new UI;

            //add book to list
            ui.addBookToList(book);
        })
    }

    static addBook(book) {
        const books = Store.getbooks();

        books.push(book);

        localStorage.setItem("books", JSON.stringify(books))

    }

    //99.04 remove form ls
    static removeBooks(isbn) {
        const books = Store.getbooks();

        books.forEach(function(book, index) {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books))

    }
}

//DOM load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks)

//03 Event listeners for adding book
document.getElementById("book-form").addEventListener("submit", function (e) {
    //04 Get form values
    const title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById("isbn").value;

    //05 Instantiate book
    const book = new Book(title, author, isbn);

    //06 instantiate Ui
    const ui = new UI();



    //13 Validate
    if (title === "" || author === "" || isbn === "") {
        //14 Error alert
        ui.showAlert("Please fill in some Movie details!!!", "error");
    } else {
        //07 addbook to list
        ui.addBookToList(book);

        //99.01 add book to store
        Store.addBook(book);

        //17 Success alert
        ui.showAlert("Movie Added!!", "success");

        //11 Clear fields
        ui.clearFields();
    };



    e.preventDefault();
});

//18 Event Listener for Book Removal
document.getElementById("book-list").addEventListener("click", function (e) {

    //instantiate Ui
    const ui = new UI();

    //delete book
    ui.deleteBook(e.target)

    //99.03 remove book form LS
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);

    // Show alert when book is deleted
    ui.showAlert("Movie Removed!!", "success")

    e.preventDefault
})