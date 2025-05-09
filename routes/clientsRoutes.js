const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');

// GET /clients - returneaza toti clientii
router.get('/', (req, res) => {
  const dataPath = path.join(__dirname, '../data/clients.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Eroare la citirea clienților' });
    }
    const clients = JSON.parse(data);
    res.json(clients);
  });
});

// POST /clients - adauga un client nou
router.post('/', (req, res) => {
    const newClient = req.body;
    const dataPath = path.join(__dirname, '../data/clients.json');
  
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Eroare la citire' });
      }
  
      const clients = JSON.parse(data);
  
      // Setează ID automat + status activ
      newClient.id = clients.length > 0 ? clients[clients.length - 1].id + 1 : 1;
      newClient.active = true;
      if (!newClient.cars) newClient.cars = [];

      if (newClient.cars && newClient.cars.length > 0) {
        newClient.cars.forEach(car => {
          if (car.horsePower && !car.kW) {
            car.kW = Math.round(car.horsePower * 0.735);
          }
        });
      }

      clients.push(newClient);
  
      fs.writeFile(dataPath, JSON.stringify(clients, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Eroare la salvare' });
        }
  
        res.status(201).json({ message: 'Client adăugat cu succes', client: newClient });
      });
    });
  });
  

// PUT /clients/:id - modifica un client după ID
router.put('/:id', (req, res) => {
    const clientId = parseInt(req.params.id);
    const updatedData = req.body;
    const dataPath = path.join(__dirname, '../data/clients.json');
  
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Eroare la citire' });
  
      const clients = JSON.parse(data);
      const index = clients.findIndex(c => c.id === clientId);
  
      if (index === -1) {
        return res.status(404).json({ error: 'Clientul nu a fost găsit' });
      }
  
      updatedData.id = clientId; // mentinem ID-ul
      updatedData.active = clients[index].active; // pastram statusul actual
      clients[index] = updatedData;
  
      fs.writeFile(dataPath, JSON.stringify(clients, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Eroare la salvare' });
  
        res.json({ message: 'Client modificat', client: updatedData });
      });
    });
  });
  
// PATCH /clients/:id/disable - dezactiveaza clientul
router.patch('/:id/disable', (req, res) => {
    const clientId = parseInt(req.params.id);
    const dataPath = path.join(__dirname, '../data/clients.json');
  
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Eroare la citire' });
  
      const clients = JSON.parse(data);
      const client = clients.find(c => c.id === clientId);
  
      if (!client) return res.status(404).json({ error: 'Clientul nu a fost găsit' });
  
      client.active = false;
  
      fs.writeFile(dataPath, JSON.stringify(clients, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Eroare la salvare' });
  
        res.json({ message: 'Client dezactivat', client });
      });
    });
  });

// PATCH /clients/:id/enable - reactiveaza clientul
router.patch('/:id/enable', (req, res) => {
    const clientId = parseInt(req.params.id);
    const dataPath = path.join(__dirname, '../data/clients.json');
  
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Eroare la citire' });
  
      const clients = JSON.parse(data);
      const client = clients.find(c => c.id === clientId);
  
      if (!client) return res.status(404).json({ error: 'Clientul nu a fost găsit' });
  
      client.active = true;
  
      fs.writeFile(dataPath, JSON.stringify(clients, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Eroare la salvare' });
  
        res.json({ message: 'Client reactivat', client });
      });
    });
  });
  
// DELETE /clients/:id - sterge clientul cu totul
router.delete('/:id', (req, res) => {
    const clientId = parseInt(req.params.id);
    const dataPath = path.join(__dirname, '../data/clients.json');
  
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: 'Eroare la citire' });
  
      let clients = JSON.parse(data);
      const index = clients.findIndex(c => c.id === clientId);
  
      if (index === -1) {
        return res.status(404).json({ error: 'Clientul nu a fost găsit' });
      }
  
      clients.splice(index, 1); // stergem clientul din array
  
      fs.writeFile(dataPath, JSON.stringify(clients, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Eroare la salvare' });
  
        res.json({ message: 'Client șters cu succes' });
      });
    });
  });
  
  
module.exports = router;
