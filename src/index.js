const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/v1/auth');
const accountsRouter = require('./routes/v1/accounts');
const billsRouter = require('./routes/v1/bills');
// const medicationsRouter = require('./routes/v1/medications');
// const logsRouter = require('./routes/v1/logs');
// const prescriptionsRouter = require('./routes/v1/prescriptions');

const { portCon } = require('./config');

const app = express();

app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(accountsRouter);
app.use(billsRouter);
// app.use(medicationsRouter);
// app.use(logsRouter);
// app.use(prescriptionsRouter);

app.get('/', (req, res) => {
  res.send({ msg: 'Server is running' });
});

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

app.listen(portCon, () => console.log(`Listening on port ${portCon}`));
