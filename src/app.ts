import express from 'express';
import cors from 'cors';
import router from './routes';
import dotenv from 'dotenv';
import { BullAdapter } from 'bull-board/bullAdapter';
import { createBullBoard } from 'bull-board';
import queue from './config/queueConfig';

const app = express();

const { router: bullBoardRouter } = createBullBoard([
    new BullAdapter(queue)
]);

app.use(cors());

//{
//   origin: 'https://mailservice.sistemagtf.com.br',
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
//}

dotenv.config();

app.use(express.json());
app.use('/api', router);
app.use('/admin/queues', bullBoardRouter);

app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});

