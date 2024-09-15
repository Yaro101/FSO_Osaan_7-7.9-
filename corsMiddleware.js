
// Adding CORS headers
export default (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') // Allow requests from any origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
}
