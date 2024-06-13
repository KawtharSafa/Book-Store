import orderRepository from "../repositories/orders.js";
import BookModel from "../models/bookModel.js";

const getOrders = async (filters = {}, options = {}) => {
  return await orderRepository.findOrders(filters, options);
};

const createOrder = async (userId, items, shippingInformation) => {
    let totalPrice = 0;

  for (const item of items) {
    const book = await BookModel.findById(item.book);
    if (!book) {
      throw new Error("Book not found");
    }
    totalPrice += book.price * item.quantity;
  }

  const orderData = {
    user: userId,
    items,
    totalPrice,
    shippingInformation,
  };
  return await orderRepository.createOrder(orderData);
};

const patchOrder = async (orderId, updatedData) => {
  //if items are updated, recalculate the total price
  if (updatedData.items) {
    let totalPrice = 0;

    for (const item of updatedData.items) {
      const book = await BookModel.findById(item.book);
      if (!book) {
        throw new Error("Book not found");
      }
      totalPrice += book.price * item.quantity;
    }

    updatedData.totalPrice = totalPrice;
  }

  return await orderRepository.updateOrderById(orderId, updatedData);
};

const patchOrderStatus = async (orderId, status, userRole) => {
  if (userRole !== "admin") {
    throw new Error("Unauthorized");
  }
  return await orderRepository.updateOrderById(orderId, { status });
};

const deleteOrder = async (orderId) => {
  return await orderRepository.deleteOrderById(orderId);
};

const getOrdersByUserId = async (userId) => {
  return await orderRepository.findOrdersByUserId(userId);
};

export default {
  getOrders,
  createOrder,
  patchOrder,
  patchOrderStatus,
  deleteOrder,
  getOrdersByUserId,
};
