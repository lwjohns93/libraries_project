const libraryContainer = document.querySelector('.library')
const newBook = document.querySelector('#new-book')
const addBook = document.querySelector('#submit-book')
const bookForm = document.querySelector('#books-modal')
const titleInput = document.querySelector('#title')
const authorInput = document.querySelector('#author')
const pagesInput = document.querySelector('#pages')
const readInput = document.querySelector('#read')
const closeBtn = document.querySelector('#close-btn')

newBook.addEventListener('click', showModal)
addBook.addEventListener('click', addNewBook)
closeBtn.addEventListener('click', closeModal)

let bookLibrary = []
loadBooks()

class Book {
  constructor(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages, 
    this.read = read
  }
}

function addNewBook() {
  let title = titleInput.value
  let author = authorInput.value
  let pages = pagesInput.value
  let read = (readInput.checked) ? 'true' : 'false'
  const newBook = new Book(title, author, pages, read)
  bookLibrary.push(newBook)
  newBook.id = bookLibrary.indexOf(newBook)

  bookForm.style.display = 'none'
  titleInput.value = ''
  authorInput.value = ''
  pagesInput.value = ''

  showBook(newBook)
  saveBooks()
} 

function showModal() {
  bookForm.style.display = 'block'
}

function closeModal() {
  bookForm.style.display = 'none'
}

function showBook(book) {
  let bookCard = document.createElement('div')
  bookCard.classList.add('card')

  let title = document.createElement('p')
  title.textContent = `Title: ${book.title}`
  bookCard.appendChild(title)

  let author = document.createElement('p')
  author.textContent = `Author: ${book.author}`
  bookCard.appendChild(author)

  let pages = document.createElement('p')
  pages.textContent = `Pages: ${book.pages}`
  bookCard.appendChild(pages)

  let label = document.createElement('label')
  label.for = 'readNotRead'
  label.textContent = 'Read:'
  bookCard.appendChild(label)

  bookCard.appendChild(readInput)
  readInput.name = 'readNotRead'
  readInput.addEventListener('click', () => {
    (readInput.checked) ? book.read = 'true' : book.read = 'false'
    saveBooks()
    console.log(book)
  })
  
  let deleteBtn = document.createElement('button')
  deleteBtn.textContent='Delete'
  deleteBtn.classList.add('delete')
  bookCard.appendChild(deleteBtn);

  deleteBtn.addEventListener('click', () => {
    bookLibrary.splice(book.id, 1)
    deleteBook(book)
    libraryContainer.removeChild(bookCard)
  })

  libraryContainer.appendChild(bookCard)
}

function saveBooks() {
  localStorage.setItem('bookLibrary', JSON.stringify(bookLibrary))
}

function loadBooks() {
  bookLibrary = JSON.parse(localStorage.getItem('bookLibrary'))
  if (bookLibrary === null) {
    bookLibrary = []
  } else {
    bookLibrary.forEach(book => {
      showBook(book)
    });
  }
}

function deleteBook(book) {
  bookLibrary = JSON.parse(localStorage.getItem('bookLibrary'))
  bookLibrary.splice(book.id, 1)
  localStorage.setItem('bookLibrary', JSON.stringify(bookLibrary))
}