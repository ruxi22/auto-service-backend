const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// GET /appointments - toate programarile
router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../data/appointments.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Eroare la citire' });

    const appointments = JSON.parse(data);
    res.json(appointments);
  });
});

// POST /appointments - adauga o programare noua
router.post('/', (req, res) => {
  const newAppointment = req.body;
  const filePath = path.join(__dirname, '../data/appointments.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Eroare la citire' });

    const appointments = JSON.parse(data);
    newAppointment.id = appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 1;

    // Validare ora: intre 8 și 17, multiplu de 30 de minute
    const startHour = parseInt(newAppointment.startTime.split(':')[0]);
    const startMinute = parseInt(newAppointment.startTime.split(':')[1]);

    if (
      startHour < 8 || startHour >= 17 ||
      (startMinute !== 0 && startMinute !== 30)
    ) {
      return res.status(400).json({ error: 'Ora de început trebuie să fie între 8:00 și 17:00, în multipli de 30 de minute' });
    }

    appointments.push(newAppointment);

    fs.writeFile(filePath, JSON.stringify(appointments, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Eroare la salvare' });

      res.status(201).json({ message: 'Programare adăugată', appointment: newAppointment });
    });
  });
});

// PATCH /appointments/:id/receive - primirea masinii
router.patch('/:id/receive', (req, res) => {
    const id = parseInt(req.params.id);
    const { observations } = req.body;
    const filePath = path.join(__dirname, '../data/appointments.json');
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Eroare la citire' });
  
      const appointments = JSON.parse(data);
      const appt = appointments.find(a => a.id === id);
  
      if (!appt) return res.status(404).json({ error: 'Programare inexistentă' });
  
      appt.received = {
        date: new Date().toISOString(),
        observations
      };
  
      fs.writeFile(filePath, JSON.stringify(appointments, null, 2), err => {
        if (err) return res.status(500).json({ error: 'Eroare la salvare' });
        res.json({ message: 'Mașina primită', appointment: appt });
      });
    });
  });
  
  // PATCH /appointments/:id/process - procesarea masinii
  router.patch('/:id/process', (req, res) => {
    const id = parseInt(req.params.id);
    const { operations, duration } = req.body; // durata în minute
  
    if (duration % 10 !== 0) {
      return res.status(400).json({ error: 'Durata trebuie să fie multiplu de 10 minute' });
    }
  
    const filePath = path.join(__dirname, '../data/appointments.json');
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Eroare la citire' });
  
      const appointments = JSON.parse(data);
      const appt = appointments.find(a => a.id === id);
  
      if (!appt) return res.status(404).json({ error: 'Programare inexistentă' });
  
      appt.processed = {
        operations,
        duration
      };
  
      fs.writeFile(filePath, JSON.stringify(appointments, null, 2), err => {
        if (err) return res.status(500).json({ error: 'Eroare la salvare' });
        res.json({ message: 'Masina procesată', appointment: appt });
      });
    });
  });
  

module.exports = router;

