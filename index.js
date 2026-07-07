import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(express.static('public')); // dito babasahin yung index.html

app.post('/api/send', async (req, res) => {
  const data = req.body;
  console.log("Nakuha:", data);
  // PUT IT HERE axios mo
  res.json({ok: true});
})

app.listen(process.env.PORT || 3000);
