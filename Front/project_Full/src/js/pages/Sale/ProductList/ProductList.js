
// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/api/reservations`);

        // 컴포넌트가 여전히 마운트된 상태인지 확인 후 상태 업데이트
        if (isMounted) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('상품을 불러오는 중 오류 발생:', error);
        // 에러 처리 추가: 사용자에게 알림 또는 적절한 대응
      }
    };

    fetchProducts();

    // 클린업 함수
    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  return (
    <div>
      <h2 className='product-head'><ProductionQuantityLimitsIcon fontSize='large' /> Product List</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>가격: {product.price}원</p>
              <button onClick={() => onAddToCart(product.id)}>장바구니에 추가</button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <button className='product-left-button'
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          이전 페이지
        </button>
        <span className='current-page'>현재 페이지 : {currentPage}</span>
        <button className='product-right-button'
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={products.length < productsPerPage}
        >
          다음 페이지
        </button>
      </div>
    </div>
  );
};

export default ProductList;