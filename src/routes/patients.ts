import express from 'express';
import {toNewPatientEntry, toPatientEntry} from '../utils';
import  Patients  from '../models/patients';
import  Diagnosis  from '../models/diagnosis';
import { Health, Hospital, Occupation} from '../models/Base';


const patientRouter = express.Router();



// Get all patients
patientRouter.get('/', async (_req, res) => {

   const patients = await Patients.find({}).populate('entries').exec();
   console.log(patients);

   res.json(patients);
});


// Get one patient
patientRouter.get('/:id', async (req, res) => {
   
    const patient = await Patients.findById(req.params.id).populate('entries').exec();
    console.log(patient);
    if (patient ) {
        res.json(patient);
    } else {
        res.sendStatus(404);
    }
});


// Create new patient
patientRouter.post('/', async (req, res) => {
   try {
       const newPatientEntry = toNewPatientEntry(req.body);

        const patient = new Patients(newPatientEntry);
    console.log(patient);
    const savedPatient = await patient.save();
    res.json(savedPatient);
} catch (error: unknown) {
    let errorMessage = ''
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
}
});


// Edit patient
patientRouter.post('/:id/entries', async (req, res) => {
    try {
        
    const diagnosis = await Diagnosis.findOne({code : req.body.diagnosisCodes})
    console.log(diagnosis);
    
    const body = toPatientEntry(req.body);
    console.log(body);
   
    const newBody = (diagnosis) ? {...body, diagnosisCodes: [diagnosis.id] } : body;
    console.log(newBody);
    const entryType = (newBody.type === "HealthCheck") ? new Health(newBody) : (newBody.type === "Hospital") ? new Hospital(newBody) :new Occupation(newBody);
    console.log(entryType);
    const savedEntry = await entryType.save();
    console.log(savedEntry.id);
    const patient = await Patients.findById(req.params.id);
    console.log(patient);
    if (patient && savedEntry) {
        const patient = await Patients.findOneAndUpdate(
            {_id: req.params.id},
            { $push: { entries: savedEntry}}
        );
        return patient; 
    }; 
    res.json(savedEntry);
    
    } catch (error: unknown) {
        let errorMessage = ''
        if (error instanceof Error) {
          return errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});


export default patientRouter;

