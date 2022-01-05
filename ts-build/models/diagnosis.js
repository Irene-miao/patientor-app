"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uniqueValidator = require("mongoose-unique-validator");
;
const diagnosisSchema = new mongoose_1.default.Schema({
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
        type: String,
        minlength: 5
    },
});
diagnosisSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
diagnosisSchema.plugin(uniqueValidator);
const Diagnosis = mongoose_1.default.model('Diagnosis', diagnosisSchema);
exports.default = Diagnosis;
