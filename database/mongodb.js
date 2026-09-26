import mongoose from 'mongoose';
import {DB_URI, NODE_ENV} from '../config/env.js';

const connectToDatabase = async () => {
    // A missing DB_URI used to throw here at import time, which killed the
    // whole process before app.listen() ever ran — so the static site and
    // the demo page were unreachable too, not just the DB-backed API routes.
    // Log and skip instead, so the server still boots.
    if(!DB_URI) {
        console.log('DB_URI not set — skipping database connection (API routes needing it will fail until it is set).');
        return;
    }
    try {
        await mongoose.connect(DB_URI);
        console.log(`Database connected in ${NODE_ENV} mode`);
    }
    catch (error) {
        console.log("Error connecting to  the database: ", error);
    }
}

export default connectToDatabase;