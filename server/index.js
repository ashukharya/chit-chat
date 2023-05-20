const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
// const { Server } = require("socket.io");
require('dotenv').config()
//const skt = require("socket.io");
app.use(cors()); 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
const server = http.createServer(app);
// const io=skt(server);

const port = process.env.PORT || 3001;
const CHAT_CLIENT_URL ="https://comforting-sunshine-191ae3.netlify.app/" || "http://localhost:3000";
const io = require("socket.io")(server, {
  cors: {
    origin: CHAT_CLIENT_URL,
    methods: ["GET", "POST"]
  }
});
// const io = new Server(server, {
//   cors: {
//     origin: CHAT_CLIENT_URL,
//     methods: ["GET","POST"]
//   },
// }); 

app.get("/",function(req,res){
  res.send(`Server is Live... with ${CHAT_CLIENT_URL}`);
}); 


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room",(data)=>{
    socket.join(data);
    console.log(`Use with ID: ${socket.id} joined room: ${data}`);
  })

  socket.on("send_message",(data)=>{
    socket.to(data.room).emit("receive_message",data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server of chat on port: ${port}`);
});
