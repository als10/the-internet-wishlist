import mongoose from 'mongoose';
import { DB_URI, isInProduction } from './config';

interface Connection {
  isConnected: mongoose.ConnectionStates;
}

const connection: Connection = {
  isConnected: 0,
};

export async function connectMongo() {
  if (connection.isConnected) {
    console.log('MongoDB is already connected!');
    return;
  }

  if (mongoose.connections.length > 0) {
    console.log(`There are ${mongoose.connections.length} connections`);
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Use MongoDB previous connection.');
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(DB_URI);
  console.log('? MongoDB connected successfully!');
  connection.isConnected = db.connections[0].readyState;
}

export async function disconnectMongo() {
  if (!connection.isConnected) return;

  if (isInProduction) {
    await mongoose.disconnect();
    connection.isConnected = 0;
    console.log('MongoDB disconnected.');
  } else {
    console.log('MongoDB not disconnected.');
  }
}
