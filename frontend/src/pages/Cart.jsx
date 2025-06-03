import React from 'react'
import { useCart } from '../context/CartContext';
const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  return (
    <div>
    {cart.map((item) => (
      <div key={item.id}>
        {item.name} - Quantity: {item.quantity}
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    ))}
  </div>
  )
}

export default Cart