import bookRepository from "../repositories/books.js";

const addBook = async (bookData) => {
  const { name, author, price, genre, version } = bookData;
  const existingBook = await bookRepository.findBook({
    name,
    author,
    price,
    genre,
    version,
  });

  if (existingBook) {
    throw new Error("Book already exists");
  }

  return await bookRepository.createBook(bookData);
};

const getBooks = async (filters = {}, options = {}) => {
  return await bookRepository.getAllBooks(filters, options);
};

const deleteBook = async (id) => {
  const deletedBook = await bookRepository.deleteBookById(id);
  if (!deletedBook) {
    throw new Error("Book not found");
  }
  return deletedBook;
};

const patchBook = async (id, updatedData) => {
  //find the book that needs to be patched
  const oldBook = await bookRepository.findBookById(id);
  if (!oldBook) {
    throw new Error("Book not found");
  }

  //Create a new book data object with the updated fields
  const newBookData = {
    title: updatedData.title || oldBook.title,
    author: updatedData.author || oldBook.author,
    genre: updatedData.genre || oldBook.genre,
    price: updatedData.price !== undefined ? updatedData.price : oldBook.price,
    availability:
      updatedData.availability !== undefined
        ? updatedData.availability
        : oldBook.availability,
    version: oldBook.version + 1,
  };

  return await bookRepository.createBook(newBookData);
};

export default {
  addBook,
  getBooks,
  deleteBook,
  patchBook,
};
