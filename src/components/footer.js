import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2023 Hotel Room Management</p>
    </footer>
  );
};

const footerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
  position: 'fixed',
  bottom: '0',
  width: '100%',
};

export default Footer;
