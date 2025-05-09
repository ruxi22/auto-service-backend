const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { description } = req.body;
  const d = description.toLowerCase();

  let suggestion = "Verificare generală";

// oferim sugestii pe baza unor cuvinte cheie
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

  res.json({
    description,
    suggestedAction: suggestion
  });
});

module.exports = router;
