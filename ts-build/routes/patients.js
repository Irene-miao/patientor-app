"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const patients_1 = __importDefault(require("../models/patients"));
const diagnosis_1 = __importDefault(require("../models/diagnosis"));
const Base_1 = require("../models/Base");
const patientRouter = express_1.default.Router();
// Get all patients
patientRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patients = yield patients_1.default.find({}).populate('entries').exec();
    console.log(patients);
    res.json(patients);
}));
// Get one patient
patientRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield patients_1.default.findById(req.params.id).populate('entries').exec();
    console.log(patient);
    if (patient) {
        res.json(patient);
    }
    else {
        res.sendStatus(404);
    }
}));
// Create new patient
patientRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPatientEntry = (0, utils_1.toNewPatientEntry)(req.body);
        const patient = new patients_1.default(newPatientEntry);
        console.log(patient);
        const savedPatient = yield patient.save();
        res.json(savedPatient);
    }
    catch (error) {
        let errorMessage = '';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
}));
// Edit patient
patientRouter.post('/:id/entries', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const diagnosis = yield diagnosis_1.default.findOne({ code: req.body.diagnosisCodes });
        console.log(diagnosis);
        const body = (0, utils_1.toPatientEntry)(req.body);
        console.log(body);
        const newBody = (diagnosis) ? Object.assign(Object.assign({}, body), { diagnosisCodes: [diagnosis.id] }) : body;
        console.log(newBody);
        const entryType = (newBody.type === "HealthCheck") ? new Base_1.Health(newBody) : (newBody.type === "Hospital") ? new Base_1.Hospital(newBody) : new Base_1.Occupation(newBody);
        console.log(entryType);
        const savedEntry = yield entryType.save();
        console.log(savedEntry.id);
        const patient = yield patients_1.default.findById(req.params.id);
        console.log(patient);
        if (patient && savedEntry) {
            const patient = yield patients_1.default.findOneAndUpdate({ _id: req.params.id }, { $push: { entries: savedEntry } });
            return patient;
        }
        ;
        res.json(savedEntry);
    }
    catch (error) {
        let errorMessage = '';
        if (error instanceof Error) {
            return errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
}));
exports.default = patientRouter;
