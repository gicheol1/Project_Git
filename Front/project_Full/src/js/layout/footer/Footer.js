import React from 'react';
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Footer = () => {
  return (

    <div class="container-xl">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Features</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Pricing</a></li>
      </ul>
      <p class="text-center text-body-secondary">&copy; 2023 Company, Inc</p>
    </div>

  );
};
export default Footer;