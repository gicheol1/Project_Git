//SaleInfo.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ProductList from './ProductList/ProductList';
import Cart from './Cart';
import OrderConfirmation from './OrderConfirmation';
import './SaleInfo.css';

const SaleInfo = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCheckout, setCheckout] = useState(false);

  const handleAddToCart = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);
    setCartItems([...cartItems, selectedProduct]);
  };

  const handleCheckout = () => {
    setCheckout(true);
  };

  useEffect(() => {
    // 서버로부터 상품 목록을 가져오는 함수 호출
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products'); // API 엔드포인트를 적절하게 수정
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="app-container">
      {!isCheckout ? (
        <>
          <ProductList products={products} onAddToCart={handleAddToCart} />
          <Cart cartItems={cartItems} onCheckout={handleCheckout} />
        </>
      ) : (
        <OrderConfirmation />
      )}
    </div>
  );
};

export default SaleInfo;