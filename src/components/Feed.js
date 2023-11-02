import React, { useState,useEffect } from "react";
import NavBar from "./navbar";
import BookRoom from "./bookroom";
import RoomList from "./RoomList";
import EditRoom from "./editRoom";

const Feed = () => {
  const [selectedOption, setSelectedOption] = useState("view"); // State to track the selected option
  const [editRoom , seteditRoom] = useState(null);
  const [roomList, setRoomList] = useState([
    {
      id: 1,
      roomNumber: "1",
      roomType: "Standard",
      email: "user1@example.com",
      startTime: "2023-11-01 09:00",
      endTime: "2023-11-01 11:00",
      price: "$120",
    },
    {
      id: 2,
      roomNumber: "2",
      roomType: "Deluxe",
      email: "user2@example.com",
      startTime: "2023-11-02 10:00",
      endTime: "2023-11-02 13:00",
      price: "$180",
    },
    // Add more dummy data as needed
  ]);

  useEffect(() => {
    // console.log('Updated editRoom:', editRoom);
  }, [editRoom]);

  const handleBookRoom = () => {
    setSelectedOption("book");
  };

  const handleRoomList = () => {
    setSelectedOption("view");
  };

  const handleEditRoom = (roomId) => {
    const roomToEdit = roomList.find(room => room.id === roomId);
  
    if (roomToEdit) {
      // Perform the required actions with the room object found
      // For instance, console log its details

    //   console.log('Room to edit:', roomToEdit);
      seteditRoom(prev => (roomToEdit))
  
      setSelectedOption('edit');
    } else {
      console.log('Room not found with ID:', roomId);
    }
  };
  

  const handleDeleteRoom = (roomToDelete) => {
    const updatedRooms = roomList.filter(room => room !== roomToDelete);

    const bookingStartTime = new Date(roomToDelete.startTime);
    const currentDateTime = new Date();

    const timeDiffInHours = (bookingStartTime - currentDateTime) / (1000 * 60 * 60);
    let refundMessage = "";
    let refundAmount = 0;

    if (timeDiffInHours > 48) {
        refundMessage = "You are eligible for a full refund.";
        refundAmount = parseFloat(roomToDelete.price.replace("$", ""));
    } else if (timeDiffInHours >= 24 && timeDiffInHours <= 48) {
        refundMessage = "You are eligible for a 50% refund.";
        refundAmount = parseFloat(roomToDelete.price.replace("$", "")) * 0.5;
    } else {
        refundMessage = "No refund will be processed, but admin can still cancel the booking.";
    }

    if (window.confirm(`Refund information: ${refundMessage}\nRefund Amount: $${refundAmount.toFixed(2)}`)) {
        // Here you might perform additional actions like updating the backend or informing the admin
        setRoomList(updatedRooms);
    }
};


  return (
    <div>
      <NavBar
        handleBookRoom={handleBookRoom}
        handleRoomList={handleRoomList}
        selectedOption={selectedOption}
      />
      {selectedOption === "book" ? (
        <BookRoom roomList={roomList} setRoomList={setRoomList} />
      ) : selectedOption === "edit" ? (
        <EditRoom roomList={roomList} setRoomList={setRoomList} currRoom = {editRoom}/>
      ) : (
        <RoomList
          roomList={roomList}
          handleEdit={handleEditRoom}
          handleDelete={handleDeleteRoom}
          setRoomList={setRoomList}
        />
      )}
    </div>
  );
};

export default Feed;
