export interface IAllergy {
  id: number;
  name: string;
  patientId: number;
}
export type IAllergyToInsert = Omit<IAllergy, 'id'>;
