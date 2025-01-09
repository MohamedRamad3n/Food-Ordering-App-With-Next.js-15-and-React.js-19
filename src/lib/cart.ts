import { CartItem } from "./../redux/features/cart";

export const deliveryFee = 10;

export const getQuantityCart = ({ cart }: { cart: CartItem[] }) => {
  return cart.reduce((quantity, item) => item.quantity! + quantity, 0);
};

export const getQuantityItem = (id: string, cart: CartItem[]) => {
  return cart.find((item) => item.id === id)?.quantity || 0;
};

export const getSubTotal = (cart: CartItem[]) => {
  return cart.reduce((total, cartItem) => {
    // item.basePrice + item.size.prize + extra.price
    const extraTotal = cartItem.extras?.reduce(
      (sum, extra) => sum + (extra.price || 0),
      0
    );
    const itemTotal =
      cartItem.basePrice + (extraTotal || 0) + (cartItem.sizes?.price || 0);
    return total + itemTotal * cartItem.quantity!;
  }, 0);
};

export const getTotalAmount = (cart:CartItem[])=>{
  return getSubTotal(cart) + deliveryFee;
}