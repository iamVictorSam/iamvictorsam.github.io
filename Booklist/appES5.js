//01 Book Contructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//02 UI Constructor
function UI() {}

//08 Add book to list PROTOTYPE
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById("book-list");
    //09 Create tr element
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
};

//15 ALERT PROTOTYPE
UI.prototype.showAlert = function (message, className) {
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
    setTimeout(function() {
        document.querySelector(".alert").remove();
    }, 3000);
}

//19 Delete PROTOTYPE
UI.prototype.deleteBook = function(target) {
    if (target.className ==="delete") {
        target.parentElement.parentElement.remove();
    }
}


//12 Clear field PROTOTYPE
UI.prototype.clearFields = function() {
    document.getElementById("title").value ="";
    document.getElementById("author").value ="";
    document.getElementById("isbn").value ="";
}

//03 Event listeners for adding book
document.getElementById("book-form").addEventListener("submit", function(e) {
    //04 Get form values
    const title = document.getElementById("title").value,
          author = document.getElementById("author").value,
          isbn = document.getElementById("isbn").value;

    //05 Instantiate book
    const book = new Book(title, author, isbn);
  
    //06 instantiate Ui
    const ui = new UI();

 

    //13 Validate
    if (title ==="" || author === "" || isbn ==="") {
        //14 Error alert
        ui.showAlert("Please fill in some details!!!", "error");
    } else {
        //07 addbook to list
        ui.addBookToList(book);

        //17 Success alert
        ui.showAlert("Book Added!!", "success");

        //11 Clear fields
        ui.clearFields();
    };

   
           
    e.preventDefault();
});

//18 Event Listener for Book Removal
document.getElementById("book-list").addEventListener("click", function(e) {

    //instantiate Ui
    const ui = new UI();

    //delete book
    ui.deleteBook(e.target)

    // Show alert when book is deleted
    ui.showAlert("Book Removed!!", "success")

    e.preventDefault
})