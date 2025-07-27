require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db')
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());      
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to myGarage API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the API endpoint!' });
  });
  
app.get('/api/cars', (req, res) => {
    db.query('SELECT * FROM cars', (err, results) => {
        if (err) {
            console.error('Error fetching cars:', err);
            return res.status(500).json({ message: 'Error fetching cars' });
        }
        res.json(results); // Send the fetched cars from the database
    });
});
  
app.post('/api/cars', (req, res) => {
  const { make, model } = req.body; // Expect { make, model } in the request body

  // Insert the new car into the database
  const query = 'INSERT INTO cars (make, model) VALUES (?, ?)';
  db.query(query, [make, model], (err, result) => {
      if (err) {
          console.error('Error adding car:', err);
          return res.status(500).json({ message: 'Error adding car' });
      }
      res.status(201).json({ message: 'Car added successfully!', id: result.insertId });
  });
});


app.get('/api/cars/search', (req,res) => {
    const searchQuery = req.query.q;
    if (!searchQuery) return res.status(400).json({message: "Query cant be blank"});
    const query = "SELECT * FROM cars WHERE make LIKE ? OR model LIKE ? ";
    const searchTerm = `%${searchQuery}%`;

    db.query(query, [searchTerm, searchTerm], (err,results) => {
        if (err) {
            console.error("Error searching cars:", err);
            return res.status(500).json({message: "Database search error "});
        }
        res.json(results);
    })


})