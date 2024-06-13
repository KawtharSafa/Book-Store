import express from "express";
import cartController from "../controllers/carts.js";

const router = express.Router();

//these apis that uses /:userId should be adjusted after adding auth middleware
//user id should be send with request internally by retrieving logged in user id

// @route    GET api/carts/:userId
// @desc     Get cart by user ID
// @access   Private
router.get("/:userId", cartController.getCartByUserId);

// @route    POST api/carts/:userId
// @desc     Create cart for user
// @access   Private
router.post("/:userId", cartController.createCart);

// @route    DELETE api/carts/:userId
// @desc     Delete cart by user ID
// @access   Private
router.delete("/:userId", cartController.deleteCart);

// @route    PATCH api/carts/:userId
// @desc     Patch cart by user ID
// @access   Private
router.patch("/:userId", cartController.patchCart);

export default router;
