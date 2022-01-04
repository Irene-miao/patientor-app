import mongoose , {Document} from 'mongoose';
import uniqueValidator = require('mongoose-unique-validator');
import { DiagnosisCodes} from '../types';

interface BaseEntry extends Document {
    description: string;
    date: string;
    type: string;
    specialist: string;
    diagnosisCodes?: DiagnosisCodes;
  
};

export const baseOptions = {
    discriminatorKey: 'kind',
    
};

 export const BaseSchema = new mongoose.Schema<BaseEntry>({
    date: {
        type: String,
        required: true,
        minlength: 5
    },
    type: {
        type: String,
        minlength: 5
    },
    specialist: {
        type:String,
        required: true,
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        minlength: 3
    },
    diagnosisCodes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Diagnosis'
        }
    ]
}, baseOptions);

BaseSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

BaseSchema.plugin(uniqueValidator);

export const Base = mongoose.model('Base', BaseSchema);

export const healthSchema = new mongoose.Schema({
    healthCheckRating: {
        type: Number,
        minlength: 1
    }
}, baseOptions);

healthSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

healthSchema.plugin(uniqueValidator);

export const Health = Base.discriminator('Health', healthSchema);

export const hospitalSchema = new mongoose.Schema({
    discharge:  
        {
            date: String,
            criteria: String
        }
}, baseOptions);

hospitalSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

hospitalSchema.plugin(uniqueValidator);


export const Hospital = Base.discriminator('Hospital', hospitalSchema);



export const occupationSchema = new mongoose.Schema({
    employerName: {
        type: String,
        minlength: 3
    },
    sickLeave:  
        {
            startDate:String,
            endDate: String
        }
}, baseOptions);

occupationSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

occupationSchema.plugin(uniqueValidator);

export const Occupation = Base.discriminator('Occupation', occupationSchema);




