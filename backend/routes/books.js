import express from "express";
import bookController from "../controllers/books.js";

const router = express.Router();

// @route    POST api/books
// @desc     Add a new book
// @access   Private
router.post("/", bookController.addBook);

// @route    GET api/books
// @desc     Get all books
// @access   Private
router.get("/", bookController.getBooks);

// @route    DELETE api/books/:id
// @desc     Delete a book
// @access   Private
router.delete("/:id", bookController.deleteBook);

// @route    PATCH api/books/:id
// @desc     Patch a book (create new version)
// @access   Private
router.patch("/:id", bookController.patchBook);

export default router;