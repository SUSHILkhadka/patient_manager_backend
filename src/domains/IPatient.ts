export interface IPatient {
  patientId: number;
  name: string;
  email: string;
  contact: string;
  dob: string;
  address: string;
  photoUrl: string;
  specialAttention: string;
  allergies: string;
}

export type IPatientToInsert = Omit<IPatient, "patientId">;
