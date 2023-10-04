import mongoose from 'mongoose';
import { MONGO_URL, NODE_ENV } from '../env';

/**
 * It connects to the database
 */
const isDEV = NODE_ENV === 'development';
export async function connect() {
  try {
    const options = {
      minPoolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    mongoose.set('strictQuery', false);
    const response = await mongoose.connect(MONGO_URL, options);
    console.log('connect successfully!');

    if (isDEV) {
      const models = mongoose.models;
      await Promise.all(
        Object.keys(models).map(async (modelName) => {
          const model = models[modelName];
          try {
            await model.syncIndexes();
            console.log(`Sync indexes for model ${modelName}`);
          } catch (err) {
            console.error(`Error when sync indexes for model ${modelName}:`, err);
          }
        })
      );
    }
    return response;
  } catch (e) {
    console.log('connect failure!');
    process.exit(1);
  }
}
