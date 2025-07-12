const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow both React and Vite dev servers
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = cors(corsOptions);
