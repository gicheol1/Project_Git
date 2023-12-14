// Product.js

import React from 'react';

const Product = ({ product, onAddToCart }) => {
  return (
    <div className="product">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>가격: {product.price}원</p>
        <button onClick={() => onAddToCart(product.id)}>장바구니에 추가</button>
      </div>
    </div>
  );
};

export default Product;