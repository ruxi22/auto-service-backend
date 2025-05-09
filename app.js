const express = require('express');
const app = express();
app.use(express.static('frontend'));
const clientsRoutes = require('./routes/clientsRoutes');
const appointmentsRoutes = require('./routes/appointmentsRoutes');
const suggestionRoutes = require('./routes/suggestionRoutes');
const PORT = 3001;

app.use(express.json());
app.use('/clients', clientsRoutes);

app.get('/', (req, res) => {
  res.send('Auto Service Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.use('/appointments', appointmentsRoutes);

app.use('/suggestions', suggestionRoutes);