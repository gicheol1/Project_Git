import React from 'react';
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <>
      <hr />
      <div class="container-xl">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item"><Link to="/" class="nav-link px-2 text-body-secondary">홈으로</Link></li>
          <li class="nav-item"><Link to="#" class="nav-link px-2 text-body-secondary">Features</Link></li>
          <li class="nav-item"><Link to="#" class="nav-link px-2 text-body-secondary">Pricing</Link></li>
        </ul>
        <p class="text-center text-body-secondary">&copy; 2023 Company, Inc</p>
      </div>
    </>
  );
};
export default Footer;