"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const patients_1 = __importDefault(require("./routes/patients"));
const mongoose = require('mongoose');
const app = (0, express_1.default)();
app.use(express_1.default.json());
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;
mongoose.connect(`${process.env.mongoUrl}`, { useNewUrlParser: true })
    .then(() => {
    console.log('connected to MongoDB');
})
    .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
});
mongoose.set('debug', true);
app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('Pong');
});
app.use(cors('*'));
app.use(express_1.default.static('build'));
app.use('/api/diagnoses', diagnoses_1.default);
app.use('/api/patients', patients_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
