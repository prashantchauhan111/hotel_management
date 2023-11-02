import React from 'react';

const NavBar = ({ handleBookRoom, handleRoomList, selectedOption }) => {
  const navStyle = {
    background: '#1E90FF',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    marginRight: '20px',
    cursor: 'pointer',
    fontSize: '1.2em',
  };

  return (
    <nav style={navStyle}>
      <div style={{ marginLeft: '20px' }}>
      <span
          style={{
            ...linkStyle,
            fontWeight: selectedOption === 'view' ? 'bold' : 'normal',
          }}
          onClick={handleRoomList}
        >
          View Room
        </span>
        <span
          style={{
            ...linkStyle,
            fontWeight: selectedOption === 'book' ? 'bold' : 'normal',
          }}
          onClick={handleBookRoom}
        >
          Book Room
        </span>
       
      </div>
    </nav>
  );
};

export default NavBar;
