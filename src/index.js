import express from 'express';
import { setupApp } from '@/plugins';
import { NODE_ENV, PORT } from '@/config/env';
import { connect } from '@/config/database';

const app = express();

setupApp(app);

// connect db mongo
connect();

app.listen(PORT, () => {
  NODE_ENV === 'development' && console.log(`Server is running at http://localhost:${PORT}`);
});
