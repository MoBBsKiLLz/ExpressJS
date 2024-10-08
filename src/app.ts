import dotenv from "dotenv"; // Import environment variables
dotenv.config({ path: "./.env" }); // Load environment variables

import express, { Request, Response } from 'express'; // Import ExpressJS
import albumsRouter from './albums/albums.routes';
import artitstRouter from './artists/artists.routes';
import logger from './middleware/logger.middleware';
import cors from 'cors';
import helmet from 'helmet';

const app = express(); // Using ExpressJS
const port = 3000; // Port used

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Enable all CORS requests
app.use(cors());

// Adding set of security middleware
app.use(helmet());

if (process.env.NODE_ENV == 'development') {
    // Add logger middleware
    app.use(logger);
    console.log(process.env.GREETING + ' in dev mode');
}

// Register routes after middleware
app.use('/', [albumsRouter, artitstRouter]);

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
