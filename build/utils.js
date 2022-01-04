"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPatientEntry = exports.assertNever = exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isNumber = (value) => {
    return typeof value === 'number';
};
const isArray = (value) => {
    return Array.isArray(value);
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
//@ts-ignore
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }) => {
    const newEntry = {
        name: parseStringField(name, 'name'),
        dateOfBirth: parseDateField(dateOfBirth, 'dateOfBirth'),
        ssn: parseStringField(ssn, 'ssn'),
        gender: parseGender(gender),
        occupation: parseStringField(occupation, 'occupation'),
        entries: []
    };
    return newEntry;
};
exports.toNewPatientEntry = toNewPatientEntry;
const parseNumberField = (value, field) => {
    if (value === undefined || !isNumber(value)) {
        throw new Error('Incorrect or missing ' + field);
    }
    return value;
};
const parseStringField = (value, field) => {
    if (!value || !isString(value)) {
        throw new Error('Incorrect or missing ' + field);
    }
    return value;
};
const parseDateField = (value, field) => {
    if (!value || !isString(value) || !isDate(value)) {
        throw new Error('Incorrect or missing ' + field);
    }
    return value;
};
const parseLeave = (value) => {
    if (!value) {
        return undefined;
    }
    if (!value.startDate || !value.endDate || !isDate(value.startDate) || !isDate(value.endDate)) {
        throw new Error('Incorrect or missing sick leave: ' + value.startDate + value.endDate);
    }
    return value;
};
const parseDischarge = (value) => {
    if (!value.date || !value.criteria || !isDate(value.date) || !isString(value.criteria)) {
        throw new Error('Incorrect or missing discharge: ' + value.criteria + value.date);
    }
    return value;
};
const parseCode = (value) => {
    if (!value) {
        return undefined;
    }
    if (!isArray(value)) {
        throw new Error('Incorrect diagnosisCodes');
    }
    if (value.find(a => !isString(a))) {
        throw new Error('Incorrect diagnosisCodes');
    }
    return value;
};
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
exports.assertNever = assertNever;
const toPatientEntry = ({ date, specialist, type, description, employerName, sickLeave, discharge, healthCheckRating, diagnosisCodes }) => {
    let entry = {
        date: parseDateField(date, 'date'),
        specialist: parseStringField(specialist, 'specialist'),
        description: parseStringField(description, 'description'),
        diagnosisCodes: parseCode(diagnosisCodes),
    };
    switch (type) {
        case 'Hospital':
            return Object.assign(Object.assign({}, entry), { type: type, discharge: parseDischarge(discharge) });
        case 'HealthCheck':
            return Object.assign(Object.assign({}, entry), { type: type, healthCheckRating: parseNumberField(healthCheckRating, 'healthCheckRating') });
        case 'OccupationalHealthcare':
            return Object.assign(Object.assign({}, entry), { type: type, employerName: parseStringField(employerName, 'employerName'), sickLeave: parseLeave(sickLeave) });
        default:
            return (0, exports.assertNever)(type);
    }
};
exports.toPatientEntry = toPatientEntry;
