import React from 'react';
import { useSelector } from 'react-redux';

import { IState } from '../store/index';
import { ICartItem } from '../store/modules/cart/types';

const Cart: React.FC = () => {
  // IState, global redux state.
  // ICartItem has all the cart information.
  const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);

  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Sub Total</th>
        </tr>
      </thead>
      <tbody>
        {cart.map(item => (
          <tr key={item.product.id}>
            <td>{item.product.title}</td>
            <td>{item.product.price}</td>
            <td>{item.quantity}</td>
            <td>{(item.product.price * item.quantity).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Cart;
