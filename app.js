import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerSchema as userSchema } from './models/user.model.js';
import {PORT} from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import diagnosisRouter from './routes/diagnosis.routes.js';
import connectToDatabase from './database/mongodb.js';
import bodyParser from 'body-parser';
import { WEB_APP_URL } from './config/env.js';
const app = express();

// Auth here is Bearer-token only (no cookies ever read for it — see
// middlewares/auth.middleware.js), so credentials:true isn't needed.
// Still an explicit allowlist rather than "*", since this is a real API
// handling real accounts and health data.
const allowedOrigins = [
  WEB_APP_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
}));

app.use(bodyParser.json());
// Serves public/demo.html at /demo.html — a standalone mini demo of the
// diagnosis flow, no auth/DB required, for anyone evaluating the API.
app.use(express.static('public'));


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
    info: {
      title: 'Lupira_API',
      version: '0.0.0',
      description: 'API documentation for Lupira',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        schemas: {
          User: userSchema,
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  
  apis: ['./routes/*.js'], //includes all routes
};
  

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

mongoose.set('strictQuery', true);  // Prevents unexpected document creation
mongoose.set('autoIndex', false);  //Prevents autoIndexing which can cause key duplication

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/diagnosis', diagnosisRouter);

app.listen(PORT, async() => {
    console.log(`The server is running on http://localhost:${PORT}`);
    await connectToDatabase();
});
export default app;

