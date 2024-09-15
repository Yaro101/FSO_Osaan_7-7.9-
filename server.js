const jsonServer = require('json-server')
const corsMiddleware = require('./corsMiddleware')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Default middlwares (logger, static, cors and no-cache)
server.use(middlewares)
// Using the CORS middlware
server.use(corsMiddleware)
// Use default router
server.use(router)

// Start the server 
server.listen(PORT, ()=>{
    console.log(`JSON Server is running on port 3001 ${PORT}`)
})
