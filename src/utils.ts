import {  NewPatientEntry, Gender, EntrywithoutId , SickLeave, Discharge, BaseEntry,  DiagnosisCodes} from "./types";


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (value: unknown): value is number => {
    return typeof value === 'number';
};

const isArray = (value: unknown): boolean => {
    return Array.isArray(value);
};



const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};


const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};


const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};




type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries?: unknown };
//@ts-ignore
export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries} : Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseStringField(name, 'name'),
        dateOfBirth: parseDateField(dateOfBirth, 'dateOfBirth'),
        ssn: parseStringField(ssn, 'ssn'),
        gender: parseGender(gender),
        occupation: parseStringField(occupation, 'occupation'),
        entries: []
    };

    return newEntry;
};


const parseNumberField = (value: unknown, field: string): number => {
    if (value===undefined || !isNumber(value)) {
        throw new Error('Incorrect or missing ' + field);
    }
    return value;
};

const parseStringField = (value: unknown, field: string): string => {
    if (!value || !isString(value)) {
        throw new Error('Incorrect or missing ' + field);
    }
    return value;
};

const parseDateField = (value: unknown, field: string): string => {
    if (!value || !isString(value) || !isDate(value)) {
        throw new Error('Incorrect or missing ' + field);
    }
    return value;
};


const parseLeave = (value: any): SickLeave | undefined => {
    if (!value) {
        return undefined;
    }
    if (!value.startDate || !value.endDate || !isDate(value.startDate) || !isDate(value.endDate)) {
        throw new Error('Incorrect or missing sick leave: ' + value.startDate + value.endDate);
    }
    return value as SickLeave;
};


const parseDischarge = (value: any): Discharge => {
    
    if (!value.date || !value.criteria || !isDate(value.date) || !isString(value.criteria)) {
        throw new Error('Incorrect or missing discharge: ' + value.criteria + value.date);
    }
    return value as Discharge;
};

const parseCode = (value: unknown): DiagnosisCodes | undefined  => {
    if (!value) {
       return undefined;
    }
    if (!isArray(value)) {
        throw new Error('Incorrect diagnosisCodes');
    }
    if ((value as Array<unknown>).find(a => !isString(a))) {
        throw new Error('Incorrect diagnosisCodes');
    }

    return value as DiagnosisCodes;
};

export const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
};

type Input = { date: unknown, specialist: unknown, type: "HealthCheck" | "Hospital" | "OccupationalHealthcare" , description: unknown, employerName?: unknown, discharge?: unknown, sickLeave?: unknown, healthCheckRating?: unknown, diagnosisCodes?: unknown };

export const toPatientEntry = ({  date, specialist, type, description, employerName, sickLeave, discharge,  healthCheckRating, diagnosisCodes}: 
    Input): EntrywithoutId => {
        
        let entry: Omit<BaseEntry, 'id'> = {
            date: parseDateField(date, 'date'),
            specialist: parseStringField(specialist, 'specialist'),
            description: parseStringField(description, 'description'),
            diagnosisCodes: parseCode(diagnosisCodes),
        };

        switch (type) {
            case 'Hospital':
                return {
                    ...entry, 
                    type: type,
                    discharge: parseDischarge(discharge)
                };
            case 'HealthCheck':
                return  {
                   ...entry,
                    type: type,
                    healthCheckRating: parseNumberField(healthCheckRating, 'healthCheckRating')
                };
            case 'OccupationalHealthcare':
                return {
                   ...entry,
                    type: type,
                    employerName: parseStringField(employerName, 'employerName'),
                    sickLeave: parseLeave(sickLeave)
                };
            default:
                return assertNever(type);
        }
    };
 



