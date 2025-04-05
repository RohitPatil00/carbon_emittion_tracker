import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/air-quality', async (req, res) => {
  try {
    const response = await axios.get('https://carbonfootprint1.p.rapidapi.com/AirQualityHealthIndex', {
      params: {
        O3: 10,
        NO2: 10,
        PM: 10
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'carbonfootprint1.p.rapidapi.com'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    res.status(500).json({ error: 'Failed to fetch air quality data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});