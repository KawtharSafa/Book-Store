import orderService from "../services/orders.js";

const getOrders = async (req, res) => {
  try {
    const filters = {};
    if (req.query.userId) filters.user = req.query.userId;
    if (req.query.status) filters.status = req.query.status;
    if (req.query.orderDate)
      filters.orderDate = { $gte: new Date(req.query.orderDate) };

    const options = {
      sortBy: req.query.sortBy || "orderDate",
      direction: req.query.direction || "desc",
      page: parseInt(req.query.page, 10) || 1,
      perPage: parseInt(req.query.perPage, 10) || 10,
    };

    const orders = await orderService.getOrders(filters, options);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const { items, shippingInformation } = req.body;

    const order = await orderService.createOrder(
      userId,
      items,
      shippingInformation
    );
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const patchOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedData = req.body;

    //make sure path param is set
    if (!orderId) {
      return res
        .status(400)
        .json({ error: "Bad request: orderId is required" });
    }

    const updatedOrder = await orderService.patchOrder(orderId, updatedData);
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const patchOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    // const userRole = req.user.role;
    //temp set hard coded for testing
    let userRole = "user";
    // let userRole = "admin";

    //make sure path param is set
    if (!orderId) {
      return res
        .status(400)
        .json({ error: "Bad request: orderId is required" });
    }

    const updatedOrder = await orderService.patchOrderStatus(
      orderId,
      status,
      userRole
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    //make sure path param is set
    if (!orderId) {
      return res
        .status(400)
        .json({ error: "Bad request: orderId is required" });
    }

    const deletedOrder = await orderService.deleteOrder(orderId);
    res.status(200).json(deletedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await orderService.getOrdersByUserId(userId);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getOrders,
  createOrder,
  patchOrder,
  patchOrderStatus,
  deleteOrder,
  getOrdersByUserId,
};
