import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
       

        <footer className="footer-container">
            <hr />
            <div className="footer-links">
            <a href='/privacy'>개인정보 처리방침</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href='/terms'>이용약관</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href='/copyright'>저작권장</a>
            </div>
        <h1>연락처 : 010-1234-5678</h1>
        <h2>Fex) XXX-8282-1337</h2>
        <h3>20XX By ***.CO © All right reservice</h3>

        </footer>
    );
};
export default Footer;