import cartService from "../services/carts.js";

const getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await cartService.getCartByUserId(userId);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { items } = req.body;
    const cart = await cartService.createCart(userId, items);
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedCart = await cartService.deleteCart(userId);
    res.status(200).json(deletedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const patchCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedItems = req.body.items;
    const updatedCart = await cartService.patchCart(userId, updatedItems);
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getCartByUserId,
  createCart,
  deleteCart,
  patchCart,
};
