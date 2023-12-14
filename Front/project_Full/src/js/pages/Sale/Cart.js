// Cart.js

import React from 'react';

const Cart = ({ cartItems }) => {
  // cartItems가 유효한지 확인 후 사용
  if (!cartItems || cartItems.length === 0) {
    return <p></p>;
  }

  return (
    <div>
      <h3>장바구니</h3>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>{item.name} - 가격: {item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;