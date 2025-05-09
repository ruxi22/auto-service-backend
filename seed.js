const fs = require('fs');
const path = require('path');

// ddate de test pentru clienți
const clients = [
  {
    id: 1,
    firstName: "Ana",
    lastName: "Popescu",
    email: "ana@example.com",
    phoneNumbers: ["0742123456"],
    active: true,
    cars: [
      {
        plate: "B123XYZ",
        vin: "ABC12345678900000",
        make: "Dacia",
        model: "Logan",
        year: 2015,
        engineType: "benzina",
        engineCapacity: 1200,
        horsePower: 75
      }
    ]
  },
  {
    id: 2,
    firstName: "Mihai",
    lastName: "Vasilescu",
    email: "mihai@email.com",
    phoneNumbers: ["0733445566"],
    active: true,
    cars: []
  }
];

// date de test pentru programari
const appointments = [
  {
    id: 1,
    clientId: 2,
    carPlate: "B555ABC",
    method: "telefon",
    action: "revizie completă",
    startTime: "10:30"
  }
];

// salvam fișierele
fs.writeFileSync(path.join(__dirname, 'data/clients.json'), JSON.stringify(clients, null, 2));
fs.writeFileSync(path.join(__dirname, 'data/appointments.json'), JSON.stringify(appointments, null, 2));

console.log('Datele de test au fost încărcate cu succes.');
