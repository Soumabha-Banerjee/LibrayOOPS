console.log("This is a Library Made by OOP Concept in JS");


//Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//Display Constructor Books
function Display() {

}

//Add methods to Display function's prototype
Display.prototype.add = function (book) {
    tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
    tableBody.innerHTML += uiString;
};
Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
};
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
};
Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Messge:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
    setTimeout(function () {
        message.innerHTML = ''
    }, 5000);
};

//take book object from local storage and add them to display.add
let books = localStorage.getItem('books');
if (books == null) {
    booksObj = [];
}
else {
    booksObj = JSON.parse(books);
}
//for checking objects run this command: console.log(booksObj);

//Creating Display object
let display = new Display();
booksObj.forEach(element => {
    display.add(element);
});

//When users click submit to add book that eventlistner
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit', libraryFormSubmit);

//libraryFormSubmit function
function libraryFormSubmit(e) {
    //Prevent the deafult form loading behaviour in browser
    e.preventDefault();

    //Creating Book object
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let type;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    let book = new Book(name, author, type);
    //Just to check object is created run this command: console.log(book);
    console.log("You have submitted library form");

    if (display.validate(book)) {
        //add to localstorage
        booksObj.push(book);
        localStorage.setItem('books', JSON.stringify(booksObj));

        display.add(book);
        display.clear();
        display.show("success","Your book has been successfuly added");
    }
    else {
        display.show("danger","Sorry! You Can't add this book");
    }

}
