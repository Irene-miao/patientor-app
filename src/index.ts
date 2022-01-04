import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
require('dotenv').config()
const PORT = process.env.PORT;

mongoose.connect(`${process.env.mongoUrl}`,{ useNewUrlParser: true } )
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error: { message: any; }) => {
  console.log('error connection to MongoDB:', error.message)
})


mongoose.set('debug', true)

app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('Pong');
});

app.use(cors('*'))
app.use(express.static('build'))
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});