import React, { useState } from 'react';
import "../styles/bookRoom.css";
import RoomType from './roomType';

const BookRoom = ({ roomList , setRoomList }) => {
  const [bookingData, setBookingData] = useState({
    id : 0,
    email: '',
    roomType:'',
    roomNumber: '',
    startTime: '',
    endTime: '',
    price: 0,
  });
//   console.log(typeof(bookingData))

const handleInputChange = e => {
    const { name, value } = e.target;

    if (name === 'roomNumber') {
      const roomNum = parseInt(value);

      if (roomNum >= 1 && roomNum <= 100) {
        setBookingData({ ...bookingData, [name]: value });
      } else {
        alert('Room number should be between 1 and 100.');
      }
    } else {
      setBookingData({ ...bookingData, [name]: value });
    }
  };

  // Function to calculate the price (replace with actual logic)


  const calculatePrice = () => {
    const room = RoomType.find(room => room.roomNumber === parseInt(bookingData.roomNumber));
  
    if (room) {
      const startTime = new Date(bookingData.startTime);
      const endTime = new Date(bookingData.endTime);
      const durationInHours = (endTime - startTime) / (1000 * 60 * 60); // Calculating duration in hours
      const totalPrice = durationInHours * room.pricePerHour; // Total price calculation
      
        
    //   console.log(bookingData);
  
      return totalPrice;
    } else {
      // If room number is not found, return 0 as the price
      return 0;
    }
  };
  


  const handleSubmit = e => {
    e.preventDefault();
  
    const room = RoomType.find(room => room.roomNumber === parseInt(bookingData.roomNumber));
  
    if (!room) {
      alert('Room number not found');
      return;
    }
  
    const startTime = new Date(bookingData.startTime);
    const endTime = new Date(bookingData.endTime);
  
    if (endTime <= startTime) {
      alert('End time must be greater than the start time.');
      return;
    }
  
    const isRoomAvailable = roomList.every(room => {
      if (room.roomNumber === bookingData.roomNumber) {
        const roomStartTime = new Date(room.startTime);
        const roomEndTime = new Date(room.endTime);
  
        return startTime >= roomEndTime || endTime <= roomStartTime;
      }
      return true;
    });
  
    if (isRoomAvailable) {
      const pricePerHour = room.pricePerHour;
      const durationInHours = (endTime - startTime) / (1000 * 60 * 60);
      const totalPrice = durationInHours * pricePerHour;
      const price = `$${totalPrice}`;
  
      const updatedBookingData = {
        ...bookingData,
        id: roomList.length + 1,
        price: price,
        roomType: room.roomType, // Set roomType when calculating price
      };
  
      setRoomList([...roomList, updatedBookingData]);
    } else {
      alert('This room is already booked for the specified period.');
    }
  };
  

  return (
    <div>
      <h2>Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" onChange={handleInputChange} />
        </label>
        <label>
          Room Number:
          <input type="text" name="roomNumber" onChange={handleInputChange} />
        </label>
        <label>
          Start Time:
          <input type="datetime-local" name="startTime" onChange={handleInputChange} />
        </label>
        <label>
          End Time:
          <input type="datetime-local" name="endTime" onChange={handleInputChange} />
        </label>
        <div>
          <strong>Calculated Price:</strong> {"$"+calculatePrice()} {/* Display calculated price */}
        </div>
        <button type="submit">Book Room</button>
      </form>
    </div>
  );
};

export default BookRoom;
