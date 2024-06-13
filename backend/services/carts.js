import cartRepository from "../repositories/carts.js";

const getCartByUserId = async (userId) => {
  return await cartRepository.findCartByUserId(userId);
};

const createCart = async (userId, items) => {
  //find cart by user id to check if they already have a cart
  const existingCart = await cartRepository.findCartByUserId(userId);
  if (existingCart) {
    throw new Error("Cart already exists for this user");
  }

  const cartData = { user: userId, items };
  return await cartRepository.createCart(cartData);
};

const deleteCart = async (userId) => {
  const deletedCart = await cartRepository.deleteCartByUserId(userId);
  if (!deletedCart) {
    throw new Error("Cart not found");
  }
  return deletedCart;
};

const patchCart = async (userId, updatedItems) => {
  const existingCart = await cartRepository.findCartByUserId(userId);
  if (!existingCart) {
    throw new Error("Cart not found");
  }

  const updatedCartData = { items: updatedItems };
  return await cartRepository.updateCartByUserId(userId, updatedCartData);
};

export default {
  getCartByUserId,
  createCart,
  deleteCart,
  patchCart,
};
