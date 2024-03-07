const addBookDialog = document.querySelector('dialog');
const addBookForm = document.querySelector('form');
const showDialogBtn = document.querySelector('#show-dialog-btn');
const closeDialogBtn = document.querySelector('#close-dialog-btn');
const bookshelf = document.querySelector('#bookshelf');

let library = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

addBookForm.onsubmit = function(event) {
    event.preventDefault();

    let title = document.querySelector('input[name="title"]');
    let author = document.querySelector('input[name="author"]');
    let pages = document.querySelector('input[name="pages"]');
    let isRead = document.querySelector('input[name="read-check"]:checked');

    console.log('submitting form');
    console.log(`title=${title.value}`);
    console.log(`author=${author.value}`);
    console.log(`pages=${pages.value}`);
    console.log(`read?=${isRead.value}`);

    addBookToLibrary(
        new Book(
            title.value,
            author.value,
            Number(pages.value),
            (/true/).test(isRead.value), // string to bool conversion
        )
    );

    populateBookshelf();

    title.value = '';
    author.value = '';
    pages.value = null;

    addBookDialog.close();

}

function populateBookshelf() {
    while (bookshelf.firstChild) {
        bookshelf.removeChild(bookshelf.lastChild);
    }

    for (let [index, book] of library.entries()) {
        console.log(`index=${index} book=${book}`);
        const newBookCard = document.createElement('article');
        newBookCard.classList.add('book-card');

        const newBookCardDivUpper = document.createElement('div');
        newBookCardDivUpper.classList.add('book-card-upper')

        const newBookCardDivLower = document.createElement('div');
        newBookCardDivLower.classList.add('book-card-lower')

        const newBookCardTitle = document.createElement('h2');
        newBookCardTitle.innerText = book.title;

        const newBookCardAuthor = document.createElement('p');
        newBookCardAuthor.innerText = `by ${book.author}`;

        const newBookCardPages = document.createElement('p');
        newBookCardPages.innerText = `${book.pages} pages`;

        const newBookCardReadBtn = document.createElement('button');
        const newBookCardReadBtnRead = document.createElement('img');
        const newBookCardReadBtnUnread = document.createElement('img');
        newBookCardReadBtnRead.src = './assets/check-circle.svg';
        newBookCardReadBtnUnread.src = './assets/circle.svg';
        newBookCardReadBtn.classList.add('mark-read-btn')
        
        newBookCardReadBtn.addEventListener('click', () => {
            library[index].toggleRead();
            console.log(library[index]);
            console.log('toggle read status');
        });

        const newBookCardRemoveBtn = document.createElement('button');
        const newBookCardRemoveBtnX = document.createElement('img');
        newBookCardRemoveBtnX.src = './assets/xmark.svg';
        newBookCardRemoveBtn.classList.add('remove-book-btn')

        newBookCardRemoveBtn.addEventListener('click', () => {
            library.splice(index, 1);
            populateBookshelf();
        });

        newBookCardDivUpper.appendChild(newBookCardTitle);
        newBookCardDivUpper.appendChild(newBookCardAuthor);
        newBookCardDivUpper.appendChild(newBookCardPages);

        // nest circle or check-circle in the mark as read button
        if (book.isRead) {
            newBookCardReadBtn.appendChild(newBookCardReadBtnRead);
        } else {
            newBookCardReadBtn.appendChild(newBookCardReadBtnUnread);
        }
        newBookCardDivLower.appendChild(newBookCardReadBtn);

        // nest x-mark in the remove button
        newBookCardRemoveBtn.appendChild(newBookCardRemoveBtnX)
        newBookCardDivLower.appendChild(newBookCardRemoveBtn);

        newBookCard.appendChild(newBookCardDivUpper);
        newBookCard.appendChild(newBookCardDivLower);

        bookshelf.appendChild(newBookCard);
    }

    // add blank card to add a new book
    const addBookCard = document.createElement('article');
    const addBookCardBtn = document.createElement('button');
    const addBookCardBtnPlus = document.createElement('img');
    addBookCard.classList.add('add-book-card');
    addBookCardBtnPlus.src = './assets/plus-circle.svg';

    addBookCardBtn.addEventListener('click', () => {
        addBookDialog.showModal();
        closeDialogBtn.focus();
    });

    addBookCardBtn.appendChild(addBookCardBtnPlus);
    addBookCard.appendChild(addBookCardBtn);

    bookshelf.appendChild(addBookCard);

}


Book.prototype.info = function() {
    let my_string = `${this.title} by ${this.author}, ${String(this.pages)} pages,`;
    if (isRead) {
        return my_string.concat(' ', 'has been read');
    } else {
        return my_string.concat(' ', 'not read yet');
    }
};

Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
    populateBookshelf();
}

function addBookToLibrary(Book) {
    library.push(Book);
    populateBookshelf();
}

closeDialogBtn.addEventListener('click', () => {
    addBookDialog.close();
    console.log('close dialog');
})

// initialize library with defaults
hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false)
nameOfTheWind = new Book('The Name of the Wind', 'Patrick Rothfuss', 662, true)
wizardOfEarthsea = new Book('A Wizard of Earthsea', 'Ursula K. Le Guin', 205, false)

addBookToLibrary(hobbit);
addBookToLibrary(nameOfTheWind);
addBookToLibrary(wizardOfEarthsea);

populateBookshelf();