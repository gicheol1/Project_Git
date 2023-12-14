// ProductList.js

// import React, { useState, useEffect } from 'react';
// import Product from './Product';
// import axios from 'axios';

// const ProductList = ({ products, onAddToCart }) => {
//   const itemsPerPage = 8;
//   const [currentPage, setCurrentPage] = useState(1);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(products.length / itemsPerPage);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };





//   useEffect(() => {
//     // 서버로부터 상품 목록을 가져오는 함수 호출
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('/api/products');
//       onAddToCart(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

  




//   return (
//     <div className="app-container">
//       <h2>판매 정보</h2>
//       <div className="product-list-container">
//         <div className="product-list">
//           {currentItems.map(product => (
//             <Product key={product.id} product={product} onAddToCart={onAddToCart} />
//           ))}
//         </div>
//       </div>
//       <div className="pagination" style={{ marginTop: '50px' }}>
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index + 1}
//             onClick={() => handlePageChange(index + 1)}
//             className={currentPage === index + 1 ? 'active' : ''}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;


// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <h2>Product List</h2>
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
        <button
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          이전 페이지
        </button>
        <span>현재 페이지: {currentPage}</span>
        <button
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