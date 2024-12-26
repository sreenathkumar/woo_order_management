import mongoose, { Mongoose } from "mongoose";

const DB_URI: string | undefined = process.env.DB_URI;

interface Cached {
    connection: Mongoose | null;
    promise: Promise<Mongoose> | undefined;
}

// Initialize the cached object with types
const cached: Cached = {
    connection: null,
    promise: undefined,
};

async function dbConnect(): Promise<Mongoose> {
    // Check if DB_URI is defined
    if (!DB_URI) {
        throw new Error(
            "Please define the DB_URI environment variable inside .env"
        );
    }

    // Return cached connection if it exists
    if (cached.connection) {
        return cached.connection;
    }

    // If no cached promise, create a new connection promise
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(DB_URI, opts);
    }

    try {
        // Await and cache the connection
        cached.connection = await cached.promise;
    } catch (e) {
        // If connection fails, reset the cached promise
        cached.promise = undefined;
        throw e;
    }

    return cached.connection;
}

export default dbConnect;
