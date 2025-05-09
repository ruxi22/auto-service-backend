## Auto Service – Backend + Minimal Frontend Project

This project was created for the Info World 2025 internship interview, backend position. It simulates a car service management system, allowing for client and appointment administration, as well as service history recording.

Acest proiect a fost realizat pentru interviul de internship **Info World 2025**, partea de backend. Am ales să implementez funcționalitățile principale pentru gestionarea unui service auto, folosind Node.js și JSON ca bază de date locală. În plus, am adăugat o interfață simplă în HTML pentru testare.

---

## Ce face aplicația

Platforma permite:

*  Administrarea clienților și mașinilor acestora
*  Gestionarea programărilor (cu validări de oră)
*  Completarea unui istoric de service (observații + reparații)
*  Funcționalitate proprie: sugestie automată de acțiune pe baza descrierii problemei

---

## Tehnologii folosite

* Node.js (Express.js)
* JavaScript
* JSON (bază de date locală)
* HTML + CSS simplu (frontend minimal)
* REST Client (pentru testare rapidă)

---

## Structura proiectului

```
Internship - InfoWorld/
├── app.js                     # Punctul de start al aplicației
├── routes/                   # Rutele REST pentru clienți, programări, sugestii
│   ├── clientsRoutes.js
│   ├── appointmentsRoutes.js
│   └── suggestionsRoutes.js
├── data/                     # Fișiere JSON cu datele salvate
│   ├── clients.json
│   └── appointments.json
├── frontend/                 # Interfață HTML simplă
│   ├── index.html
│   ├── admin.html
│   └── client.html
├── seed.js                   # Script pentru încărcarea datelor de test
├── requests.http             # Testare rapidă a tuturor rutelor
├── .nvmrc                    # Versiunea recomandată Node.js
├── .gitignore                # Ignoră /node_modules
├── package.json              # Dependințe și comenzi
└── README.md
```

---

## Cum rulezi proiectul

1. Instalează dependențele:

```bash
npm install
```


2. Pornește serverul:

```bash
npm start
```

---

##  Rutele disponibile (REST)

###  Clienți (`/clients`)

* `GET /clients` – toți clienții
* `POST /clients` – adaugă client
* `PUT /clients/:id` – modifică client
* `PATCH /clients/:id/disable` – dezactivează client
* `PATCH /clients/:id/enable` – reactivează client
* `DELETE /clients/:id` – șterge client

###  Programări (`/appointments`)

* `GET /appointments` – listare
* `POST /appointments` – adaugă programare
* `PATCH /appointments/:id/receive` – notare observații la primire
* `PATCH /appointments/:id/process` – reparații și durată

###  Sugestii (`/suggestions`)

* `POST /suggestions` – primește descriere și returnează acțiune sugerată

```js
router.post('/', (req, res) => {
  const { description } = req.body;
  const d = description.toLowerCase();

  let suggestion = "Verificare generală";

  if (d.includes("frână") || d.includes("frânez") || d.includes("vibra")) {
    suggestion = "Verificare sistem de frânare";
  } else if (d.includes("ulei") || d.includes("scurgere") || d.includes("pete")) {
    suggestion = "Verificare pierderi ulei / Schimb ulei";
  } else if (d.includes("motor") || d.includes("sunet") || d.includes("pornire")) {
    suggestion = "Diagnoză motor";
  } else if (d.includes("ac") || d.includes("climă") || d.includes("aer")) {
    suggestion = "Verificare sistem climatizare";
  } else if (d.includes("baterie") || d.includes("nu pornește")) {
    suggestion = "Verificare sistem electric / baterie";
  }

  res.json({ description, suggestedAction: suggestion });
});
```

---

##  Funcționalitate proprie

Am adăugat o funcționalitate proprie de **sugestie automată de acțiune** pe baza textului introdus de client. Este implementată în ruta `POST /suggestions` și oferă un răspuns personalizat în funcție de cuvinte-cheie (ex: "vibrație", "ulei", "motor", etc).

Aceasta simulează un sistem de recomandare de bază și poate fi extins cu o bază de reguli mai complexă sau chiar ML.

---



