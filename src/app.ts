import express from 'express';
import ticketRoutes from './routes/ticketRoutes';
import { transactionIdMiddleware } from './middleware/transactionIdMiddleware';

const app = express();

app.use(transactionIdMiddleware);
app.use(express.json());

app.use('/v2/api/ticket', ticketRoutes);

export default app;
