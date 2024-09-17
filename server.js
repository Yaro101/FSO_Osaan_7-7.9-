const jsonServer = require('json-server')
const cors = require('cors')
const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

const PORT = 3001

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

server.use(cors(corsOptions))
// Using the CORS middlware
server.use(middlewares)
server.use(jsonServer.bodyParser)
// Use default router
server.use(router)

// Start the server 
server.listen(PORT, ()=>{
    console.log(`JSON Server is running on ${PORT}`)
})
