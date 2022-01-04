import mongoose, {Document} from 'mongoose';
import uniqueValidator = require('mongoose-unique-validator')
import { Diagnose} from '../types';



interface DiagnoseEntry extends Document {
    code: Diagnose;
    name: string;
    latin?: string;
};

const diagnosisSchema = new mongoose.Schema<DiagnoseEntry>({
    code: {
        type: String,
        required: true,
        minlength: 5
    },
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    latin: {
        type:String,
        minlength: 5
    },
})

diagnosisSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

diagnosisSchema.plugin(uniqueValidator)
const Diagnosis = mongoose.model<DiagnoseEntry>('Diagnosis', diagnosisSchema);
export default Diagnosis;