import mongoose, {Document} from 'mongoose';
import uniqueValidator = require('mongoose-unique-validator')
import {Gender, Entry} from '../types';


interface PatientEntry extends Document {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
};


const patientSchema = new mongoose.Schema<PatientEntry>({
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    dateOfBirth: {
        type: String,
        minlength: 5
    },
    ssn: {
        type:String,
        required: true,
        minlength: 5
    },
    gender: {
        type: String,
        required: true,
        minlength: 3
    },
    occupation: {
        type: String,
        required: true,
        minlength: 3
    }, 
    entries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Base'
        }
    ] 
});

patientSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

patientSchema.plugin(uniqueValidator)



const Patients = mongoose.model<PatientEntry>('Patients', patientSchema);
export default Patients;