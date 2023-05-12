import "./App.css";
import io from "socket.io-client";
import React, { useState } from "react";
import Chat from "./Chat";
const CHAT_SERVER_URL = process.env.SERVER_URL || "http://localhost:3001";
const socket=io.connect(CHAT_SERVER_URL);
//const socket = io.connect("http://localhost:3001");
//https://chat-app-be-e091.onrender.com
    
function App() {
  const [username,setUsername]=useState("");
  const [room,setRoom]=useState("");
  const [showChat,setShowChat]=useState(false);

  const joinRoom = ()=>{
    if(username !== "" && room!==""){
      socket.emit("join_room",room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
      <div className="joinChatContainer">
      <h3>Join A Chat</h3>
      <input type="text" placeholder="Enter Name" onChange={(event)=>{
          setUsername(event.target.value);
      }}
      />
    <input type="text" placeholder="Enter Room ID" onChange={(event)=>{
          setRoom(event.target.value);
      }}
    />
    <button onClick={joinRoom}>Join Room</button>
      </div>
      )
    : (
    <Chat socket={socket} username={username} room={room}/>
      )};
    </div>
  ); 
}

export default App;
