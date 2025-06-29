import { AppDataSource } from './data-source';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    await AppDataSource.initialize();
    console.log('Database connection successful');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testConnection();
