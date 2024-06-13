import OrderModel from "../models/orderModel.js";

//repository of paginated list of orders using mongoose
const findOrders = async (filters = {}, options = {}) => {
  const query = OrderModel.find(filters).populate("items.book");

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
    console.error("Error finding orders:", error);
    throw error;
  }
};

const findOrderById = async (orderId) => {
  try {
    return await OrderModel.findById(orderId).populate("items.book");
  } catch (error) {
    console.error("Error finding order", error);
    throw error;
  }
};

const createOrder = async (orderData) => {
  const order = new OrderModel(orderData);
  try {
    return await order.save();
  } catch (error) {
    console.error("Error creating order", error);
    throw error;
  }
};

const updateOrderById = async (orderId, updatedData) => {
  try {
    return await OrderModel.findByIdAndUpdate(orderId, updatedData, {
      new: true,
    }).populate("items.book");
  } catch (error) {
    console.error("Error updating order", error);
    throw error;
  }
};

const deleteOrderById = async (orderId) => {
  try {
    return await OrderModel.findByIdAndDelete(orderId);
  } catch (error) {
    console.error("Error deleting order", error);
    throw error;
  }
};

const findOrdersByUserId = async (userId) => {
  try {
    return await OrderModel.find({ user: userId }).populate("items.book");
  } catch (error) {
    console.error("Error finding orders by user ID", error);
    throw error;
  }
};

export default {
  findOrders,
  findOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
  findOrdersByUserId,
};
