import express from "express";
import orderController from "../controllers/orders.js";
// import { isAdmin } from "../middleware/middleware.js";

const router = express.Router();

// @route    GET api/orders
// @desc     Get all orders with filters
// @access   Private
router.get("/", orderController.getOrders);

// @route    POST api/orders/:userId
// @desc     Create an order for a user
// @access   Private
router.post("/:userId", orderController.createOrder);

// @route    PATCH api/orders/:orderId
// @desc     Patch an order
// @access   Private
router.patch("/:orderId", orderController.patchOrder);

// @route    PATCH api/orders/:orderId/status
// @desc     Patch order status (admin only)
// @access   Private
router.patch("/:orderId/status", orderController.patchOrderStatus);
// router.patch("/:orderId/status", isAdmin, orderController.patchOrderStatus);

// @route    DELETE api/orders/:orderId
// @desc     Delete an order by order ID
// @access   Private
router.delete("/:orderId", orderController.deleteOrder);

// @route    GET api/orders/user/:userId
// @desc     Get orders by user ID
// @access   Private
router.get("/user/:userId", orderController.getOrdersByUserId);

export default router;
