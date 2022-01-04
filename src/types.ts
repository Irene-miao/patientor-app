

export type Diagnose = 'M24.2' | 'M51.2' | 'S03.5' | 'J10.1' | 'J06.9' | 'Z57.1' | 'N30.0' | 'H54.7' | 'J03.0' | 'L60.1' | 'Z74.3' | 'L20' | 'F43.2' | 'S62.5' | 'H35.29' | 'J12.82';

export interface DiagnoseEntry {
    id: any;
    code: Diagnose;
    name: string;
    latin?: string;
};


export enum Gender {
    Male = 'male',
    Female = 'female',
};

export type DiagnosisCodes = Array<DiagnoseEntry['code']>;

export interface BaseEntry {
    id?: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: DiagnosisCodes;
};


export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
};


export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
};

export interface Discharge {
    date: string;
    criteria: string;
};

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
};

export interface SickLeave {
    startDate: string;
    endDate: string;
};

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
};

export type Entry = 
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;



export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
};


// Define special omit for unions
export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntrywithoutId = UnionOmit<Entry, 'id'>;



export type Patient = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >;

