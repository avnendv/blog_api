import express from 'express';
import { setupApp } from '@/plugins';
import { APP_URL, PORT } from '@/config/env';
import { connect } from '@/config/database';
import faker from '@/faker';

const app = express();

setupApp(app);

// connect db mongo
connect();

// faker
faker(true);

app.listen(PORT, () => console.log(`Server is running at ${APP_URL}:${PORT}`));
