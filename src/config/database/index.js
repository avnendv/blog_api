import mongoose from 'mongoose';
import { MONGODB_PASSWORD, MONGODB_PORT, MONGO_DB_NAME, MONGO_HOST, MONGO_URL, MONGO_USER } from '../env';
import { A_SECOND, IS_PROD } from '../constants';

/**
 * It connects to the database
 */

const MAX_CONNECT_RETRY = 3;

export async function connect(connectCount = 0) {
  try {
    const URL =
      MONGO_USER && MONGODB_PASSWORD && MONGO_HOST
        ? `mongodb://${MONGO_USER}:${MONGODB_PASSWORD}@${MONGO_HOST}:${MONGODB_PORT}/?retryWrites=true&w=majority`
        : MONGO_URL;

    const options = {
      dbName: MONGO_DB_NAME,
      minPoolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    mongoose.set('strictQuery', false);
    const response = await mongoose.connect(URL, options);
    console.log('DB::: connect successfully!');

    if (!IS_PROD) {
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
    console.error('DB::: connect failure!', e);

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
