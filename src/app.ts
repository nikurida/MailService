import express from 'express';
import cors from 'cors';
import router from './routes';
import dotenv from 'dotenv';

const app = express();

app.use(cors());

//{
//   origin: 'https://mailservice.sistemagtf.com.br',
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
//}

dotenv.config();

app.use(express.json());
app.use('/api', router);

app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});

