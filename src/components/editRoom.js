import React, { useState } from 'react';
import "../styles/bookRoom.css";
import RoomType from './roomType';

const EditRoom = ({ roomList, setRoomList, currRoom }) => {
  const [bookingData, setBookingData] = useState(currRoom);

  const handleInputChange = e => {
    const { name, value } = e.target;
    
    if (name === 'roomNumber') {
      const roomNum = parseInt(value);

      if (roomNum >= 1 && roomNum <= 100) {
        const roomType = RoomType.find(room => room.roomNumber === roomNum);
        if (roomType) {
          setBookingData({ ...bookingData, [name]: value, roomType: roomType.roomType });
        } else {
          setBookingData({ ...bookingData, [name]: value, roomType: '' });
        }
      } else {
        alert('Room number should be between 1 and 100.');
      }
    } else {
      setBookingData({ ...bookingData, [name]: value });
    }
  };

  // Function to calculate the price
  const calculatePrice = () => {
    const pricePerHour = 100; // Example price per hour
    const startTime = new Date(bookingData.startTime);
    const endTime = new Date(bookingData.endTime);
    const durationInHours = (endTime - startTime) / (1000 * 60 * 60);
    const totalPrice = durationInHours * pricePerHour;
    return totalPrice;
  };

  const handleSubmit = e => {
    e.preventDefault();


    const startTime = new Date(bookingData.startTime);
    const endTime = new Date(bookingData.endTime);

    if (endTime <= startTime) {
      alert('End time must be greater than the start time.');
      return;
    }

    const isRoomAvailable = roomList.every(room => {
      if (room.id !== currRoom.id && room.roomNumber === bookingData.roomNumber) {
        const roomStartTime = new Date(room.startTime);
        const roomEndTime = new Date(room.endTime);
        return startTime >= roomEndTime || endTime <= roomStartTime;
      }
      return true;
    });

    if (isRoomAvailable) {
      const price = "$" + calculatePrice();

      const updatedRoomList = roomList.map(room => {
        if (room.id === currRoom.id) {
          return {
            ...room,
            email: bookingData.email,
            roomNumber: bookingData.roomNumber,
            roomType: bookingData.roomType,
            startTime: bookingData.startTime,
            endTime: bookingData.endTime,
            price: price,
          };
        }
        return room;
      });

      setRoomList(updatedRoomList);
    } else {
      alert('This room is already booked for the specified period.');
    }
  };

  return (
    <div>
      <h2>Changing Room Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" onChange={handleInputChange} defaultValue={currRoom.email} />
        </label>
        <label>
          Room Number:
          <input type="text" name="roomNumber" onChange={handleInputChange} defaultValue={currRoom.roomNumber} />
        </label>
        <label>
          Start Time:
          <input type="datetime-local" name="startTime" onChange={handleInputChange} defaultValue={currRoom.startTime} />
        </label>
        <label>
          End Time:
          <input type="datetime-local" name="endTime" onChange={handleInputChange} defaultValue={currRoom.endTime} />
        </label>
        <div>
          <strong>Calculated Price:</strong> {"$" + calculatePrice()}
        </div>
        <button type="submit">Save Room</button>
      </form>
    </div>
  );
};

export default EditRoom;
