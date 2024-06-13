import BookModel from "../models/bookModel.js";

const createBook = async (bookData) => {
  const book = new BookModel(bookData);
  try {
    return await book.save();
  } catch (error) {
    console.error("Error saving books:", error);
    throw error; // Rethrow the error to be caught by the calling function
  }
};

const getAllBooks = async (filters = {}, options = {}) => {
  const query = BookModel.find(filters);

  if (options.sortBy) {
    const sort = {};
    sort[options.sortBy] = options.direction === "desc" ? -1 : 1;
    query.sort(sort);
  }

  const page = options.page > 0 ? options.page : 1;
  const perPage = options.perPage > 0 ? options.perPage : 10;
  query.skip((page - 1) * perPage).limit(perPage);

  try {
    return await query.exec();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

const findBookById = async (id) => {
  try {
    return await BookModel.findById(id);
  } catch (error) {
    console.error("Error finding book", error);
    throw error;
  }
};

const findBook = async (filter) => {
  try {
    return await BookModel.findOne(filter);
  } catch (error) {
    console.error("Error finding book:", error);
    throw error;
  }
};

const deleteBookById = async (id) => {
  try {
    return await BookModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting book", error);
    throw error;
  }
};

export default {
  createBook,
  getAllBooks,
  findBookById,
  deleteBookById,
  findBook,
};
