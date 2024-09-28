import express from 'express';
import ticketRoutes from './routes/ticketRoutes';
import healthCheckRoutes from './routes/healthCheckRoutes';
import { transactionIdMiddleware } from './middleware/transactionIdMiddleware';

const app = express();

app.use(transactionIdMiddleware);
app.use(express.json());

app.use('/v2/api/ticket', ticketRoutes);
app.use('/v2/api/health', healthCheckRoutes);

export default app;
