import React from 'react';
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <>
      <hr />
      <div class="container-xl">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item"><Link to="/" class="nav-link px-2 text-body-secondary">홈으로</Link></li>
          <li class="nav-item"><Link to="#" class="nav-link px-2 text-body-secondary">Features</Link></li>
          <li class="nav-item"><Link to="#" class="nav-link px-2 text-body-secondary">Pricing</Link></li>
          <a href='https://www.instagram.com/' className="social-link" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
          </a>
          &nbsp;&nbsp;
          <a href='https://www.facebook.com/' className="social-link" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
          </a>
          &nbsp;&nbsp;
          <a href='https://twitter.com/' className="social-link" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
          </a>
        </ul>
        
        <p class="text-center text-body-secondary">&copy; 2023 Company, Inc</p>
        
      </div>
    </>
  );
};
export default Footer;