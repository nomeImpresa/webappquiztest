const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*', // frontend URL in produzione
    methods: ['GET', 'POST']
  }
})

// API REST example
app.get('/api/ping', (req, res) => {
  res.send('pong')
})

// WebSocket example
io.on('connection', (socket) => {
  console.log('👤 New client connected:', socket.id)

  socket.on('message', (msg) => {
    console.log('💬 Received:', msg)
    io.emit('message', msg) // broadcast
  })

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id)
  })
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`)
})
