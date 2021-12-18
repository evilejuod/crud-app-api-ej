const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Routes import
const usersRoutes = require('./routes/v1/usersRoute');

const PORT = process.env.SERVER_PORT || 5000;

const app = express();

// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api', usersRoutes);

// 404 not found url
app.all('*', (req, res) => {
  res.status(404).send('Oops page not found');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
