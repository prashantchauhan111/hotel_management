import React, { useState } from 'react';

const RoomList = ({ roomList, handleEdit, handleDelete }) => {
  const [filters, setFilters] = useState({
    roomNumber: '',
    roomType: '',
    startTime: '',
    endTime: '',
  });

  const filteredRooms = roomList.filter(room => {
    return (
      (filters.roomNumber === '' || room.roomNumber.toLowerCase().includes(filters.roomNumber.toLowerCase())) &&
      (filters.roomType === '' || room.roomType.toLowerCase().includes(filters.roomType.toLowerCase())) &&
      (filters.startTime === '' || new Date(room.startTime) >= new Date(filters.startTime)) &&
      (filters.endTime === '' || new Date(room.endTime) <= new Date(filters.endTime))
    );
  });

  const tableStyle = {
    border: '1px solid #ccc',
    width: '100%',
    margin: '20px 0',
    borderRadius: '5px',
  };

  const thStyle = {
    backgroundColor: '#f2f2f2',
    padding: '8px',
    textAlign: 'left',
  };

  const tdStyle = {
    borderBottom: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const tdActionButtonStyle = {
    textAlign: 'left',
    paddingLeft: '8px', // Add space to the left
  };

  const buttonStyle = {
    marginRight: '5px', // Add margin to the right of the buttons
  };

  return (
    <div>
      <h2>Room List</h2>
      <div>
        <input
          type="text"
          placeholder="Room Number"
          value={filters.roomNumber}
          onChange={(e) => setFilters({ ...filters, roomNumber: e.target.value })}
        />
        <input
          type="text"
          placeholder="Room Type"
          value={filters.roomType}
          onChange={(e) => setFilters({ ...filters, roomType: e.target.value })}
        />
        <input
          type="datetime-local"
          placeholder="Start Time"
          value={filters.startTime}
          onChange={(e) => setFilters({ ...filters, startTime: e.target.value })}
        />
        <input
          type="datetime-local"
          placeholder="End Time"
          value={filters.endTime}
          onChange={(e) => setFilters({ ...filters, endTime: e.target.value })}
        />
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Room Number</th>
            <th style={thStyle}>Room Type</th>
            <th style={thStyle}>User's Email</th>
            <th style={thStyle}>Start Time</th>
            <th style={thStyle}>End Time</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map(room => (
            <tr key={room.id}>
              <td style={tdStyle}>{room.roomNumber}</td>
              <td style={tdStyle}>{room.roomType}</td>
              <td style={tdStyle}>{room.email}</td>
              <td style={tdStyle}>{room.startTime}</td>
              <td style={tdStyle}>{room.endTime}</td>
              <td style={tdStyle}>{room.price}</td>
              <td style={tdActionButtonStyle}>
                  <button style={buttonStyle} onClick={() => handleEdit(room.id)}>Edit</button>
                  <button style={buttonStyle} onClick={() => handleDelete(room)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;
