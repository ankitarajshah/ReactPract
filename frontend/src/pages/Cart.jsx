import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);

  console.log(items);

  const dispatch = useDispatch();

  if (!items || items.length === 0) return <p>Your cart is empty</p>;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div>Cart</div>
      {items.map((item) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price} each</p>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
    </>
  );
};

export default Cart;
