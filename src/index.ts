import express, { Request, Response } from 'express';
import { sequelize } from './config/database';
import * as dotenv from "dotenv";
import * as User_Route from './routes/User_Route'

dotenv.config();

import { config } from './config';

const app = express();
const PORT = config.port ? config.port : 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', User_Route.default);

app.get('/test', (
    req: Request, res: Response
) => {
    res.status(200).send('Hello from backend server');
});

// app.listen(PORT, () => {
//     console.log(`Server is running at localhost:${PORT}`);
// });
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established');
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server is running at localhost:${PORT}`);
        });
    } catch (error: any) {
        console.error(`Unable to connect to database: ${error}`);
        process.exit(1);
    }
};
  
// Start the server
startServer();