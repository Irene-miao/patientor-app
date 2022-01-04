import express from 'express';
import  Diagnosis  from '../models/diagnosis';

const router = express.Router();


//Get all diagnoses
router.get('/', async (_req, res) => {
    const diagnoses = await Diagnosis.find({});
    res.json(diagnoses);
});

// Create new diagnosis
router.post('/', async (req, res) => {
 const diagnosisEntry = req.body;
const diagnosis = new Diagnosis(diagnosisEntry);
console.log(diagnosis);
const savedDiagnosis = await diagnosis.save();
res.json(savedDiagnosis);
})

export default router;