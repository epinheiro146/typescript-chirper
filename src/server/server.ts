import * as express from 'express';

import apiRouter from './routes';

let app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use(express.static('client'));

app.listen(3000);