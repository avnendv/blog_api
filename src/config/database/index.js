import mongoose from 'mongoose';
import { MONGO_URL, NODE_ENV } from '../env';

/**
 * It connects to the database
 */
const isDEV = NODE_ENV === 'development';
export async function connect() {
  try {
    const options = {
      dbName: 'blog-db',
      minPoolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    mongoose.set('strictQuery', false);
    const response = await mongoose.connect(MONGO_URL, options);
    console.log('DB::: connect successfully!');

    if (isDEV) {
      const models = mongoose.models;
      await Promise.all(
        Object.keys(models).map((modelName) => {
          const model = models[modelName];
          model
            .syncIndexes()
            .then(() => console.log(`DB::: Sync indexes for model ${modelName}`))
            .catch((err) => console.error(`DB::: Error when sync indexes for model ${modelName}:`, err));
        })
      );
    }
    return response;
  } catch (e) {
    console.log('DB::: connect failure!');
    process.exit(1);
  }
}
