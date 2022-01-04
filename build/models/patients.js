"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uniqueValidator = require("mongoose-unique-validator");
;
const patientSchema = new mongoose_1.default.Schema({
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
        type: String,
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Base'
        }
    ]
});
patientSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
patientSchema.plugin(uniqueValidator);
const Patients = mongoose_1.default.model('Patients', patientSchema);
exports.default = Patients;
