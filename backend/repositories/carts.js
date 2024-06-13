import CartModel from "../models/cartModel.js";

const findCartByUserId = async (userId) => {
  try {
    return await CartModel.findOne({ user: userId }).populate("items.book");
  } catch (error) {
    console.error("Error finding cart", error);
    throw error;
  }
};

const createCart = async (cartData) => {
  const cart = new CartModel(cartData);
  try {
    await cart.save();
    return await CartModel.findById(cart._id).populate("items.book"); //populate is to preload the internal book object
  } catch (error) {
    console.error("Error creating cart", error);
    throw error;
  }
};

const deleteCartByUserId = async (userId) => {
  try {
    return await CartModel.findOneAndDelete({ user: userId });
  } catch (error) {
    console.error("Error deleting cart", error);
    throw error;
  }
};

const updateCartByUserId = async (userId, updatedData) => {
  try {
    return await CartModel.findOneAndUpdate(
      { user: userId },
      { $set: updatedData },
      { new: true }
    ).populate("items.book");
  } catch (error) {
    console.error("Error updating cart", error);
    throw error;
  }
};

export default {
  findCartByUserId,
  createCart,
  deleteCartByUserId,
  updateCartByUserId,
};
