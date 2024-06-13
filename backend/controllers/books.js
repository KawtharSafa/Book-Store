import bookService from "../services/books.js";

const addBook = async (req, res) => {
  try {
    const book = await bookService.addBook(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const filters = {};
    if (req.query.id) filters._id = req.query.id;
    if (req.query.availability) filters.availability = req.query.availability;
    if (req.query.title) filters.title = new RegExp(req.query.title, 'i');
    if (req.query.author) filters.author = new RegExp(req.query.author, 'i');
    if (req.query.priceRange) {
      const [minPrice, maxPrice] = req.query.priceRange.split(',').map(Number);
      filters.price = { $gte: minPrice, $lte: maxPrice };
    }

    const options = {
      sortBy: req.query.sortBy || 'title',
      direction: req.query.direction || 'asc',
      page: parseInt(req.query.page, 10) || 1,
      perPage: parseInt(req.query.perPage, 10) || 10,
    };

    const books = await bookService.getBooks(filters, options);
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await bookService.deleteBook(id);
    res.status(200).json(deletedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const patchBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const newBook = await bookService.patchBook(id, updatedData);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  addBook,
  getBooks,
  deleteBook,
  patchBook,
};
