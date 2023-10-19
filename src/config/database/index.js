import mongoose from 'mongoose';
import { MONGO_DB_NAME, MONGO_URL, NODE_ENV } from '../env';
import { A_SECOND } from '../constants';

/**
 * It connects to the database
 */
const isDEV = NODE_ENV === 'development';
const MAX_CONNECT_RETRY = 3;

export async function connect(connectCount = 0) {
  try {
    const options = {
      dbName: MONGO_DB_NAME,
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

    // retry connect db when connect fail
    if (connectCount < MAX_CONNECT_RETRY) {
      setTimeout(
        async () => {
          await connect(connectCount + 1);
        },
        connectCount * 3 * A_SECOND + Math.random() * A_SECOND
      );
      return;
    }
    process.exit(1);
  }
}
