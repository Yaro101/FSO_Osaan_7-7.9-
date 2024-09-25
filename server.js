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

// Custom route to update user blogs
server.patch('/users/:id', (req, res) => {
  const { id } = req.params;
  const { blog } = req.body; // Expecting blog to be sent in the request body

  // Get the current users from db.json
  const db = router.db; // Get the database instance
  const user = db.get('users').find({ id }).value(); // Find the user by ID

  if (user) {
      // Add the new blog to the user's blogs array
      user.blogs.push(blog);

      // Update the user in the database
      db.get('users').find({ id }).assign(user).write();
      
      res.json(user);
  } else {
      res.status(404).send('User not found');
  }
});

// Use default router
server.use(router)

// Start the server 
server.listen(PORT, ()=>{
    console.log(`JSON Server is running on ${PORT}`)
})
