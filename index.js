import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(express.static('public')); // para sa index.html mo

// DITO NA YUNG API MO
app.post('/api/send', async (req, res) => {
  const data = req.body;
  console.log("Data nakuha:", data);
  
  // PUT IT HERE axios mo
  // await axios.post('https://api.telegram.org/...', data)
  
  res.json({ok: true});
})

app.listen(process.env.PORT || 3000);
