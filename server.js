const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('drawName', (data) => {
    socket.broadcast.emit('drawName', data);
  });

  socket.on('selectAnswer', (data) => {
    socket.broadcast.emit('selectAnswer', data);
  });

  socket.on('closeModal', () => {
    socket.broadcast.emit('closeModal');
  });

  socket.on('resetGame', () => {
    socket.broadcast.emit('resetGame');
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  socket.on('animarNombre', (nombre) => {
    socket.broadcast.emit('animarNombre', nombre);
  });

  socket.on('gameOver', () => {
    socket.broadcast.emit('gameOver');
  });

});

const PORT = 3000;
/*server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});*/
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
