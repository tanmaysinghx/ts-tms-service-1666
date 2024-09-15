import app from './app';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db';

dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port number:`, PORT);
  connectToDatabase();
});

