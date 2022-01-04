"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Occupation = exports.occupationSchema = exports.Hospital = exports.hospitalSchema = exports.Health = exports.healthSchema = exports.Base = exports.BaseSchema = exports.baseOptions = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const uniqueValidator = require("mongoose-unique-validator");
;
exports.baseOptions = {
    discriminatorKey: 'kind',
};
exports.BaseSchema = new mongoose_1.default.Schema({
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
        type: String,
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Diagnosis'
        }
    ]
}, exports.baseOptions);
exports.BaseSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
exports.BaseSchema.plugin(uniqueValidator);
exports.Base = mongoose_1.default.model('Base', exports.BaseSchema);
exports.healthSchema = new mongoose_1.default.Schema({
    healthCheckRating: {
        type: Number,
        minlength: 1
    }
}, exports.baseOptions);
exports.healthSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
exports.healthSchema.plugin(uniqueValidator);
exports.Health = exports.Base.discriminator('Health', exports.healthSchema);
exports.hospitalSchema = new mongoose_1.default.Schema({
    discharge: {
        date: String,
        criteria: String
    }
}, exports.baseOptions);
exports.hospitalSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
exports.hospitalSchema.plugin(uniqueValidator);
exports.Hospital = exports.Base.discriminator('Hospital', exports.hospitalSchema);
exports.occupationSchema = new mongoose_1.default.Schema({
    employerName: {
        type: String,
        minlength: 3
    },
    sickLeave: {
        startDate: String,
        endDate: String
    }
}, exports.baseOptions);
exports.occupationSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
exports.occupationSchema.plugin(uniqueValidator);
exports.Occupation = exports.Base.discriminator('Occupation', exports.occupationSchema);
