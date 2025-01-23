import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';
import config from './app/config';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('Database connection failed!', err);
    process.exit(1); // Exit process if connection fails
  }
}

main();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  if (server) {
    server.close(() => {
      console.log('Server closed due to unhandled rejection.');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  if (server) {
    server.close(() => {
      console.log('Server closed due to uncaught exception.');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
