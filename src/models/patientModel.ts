import db from '../db/db';
import { IPatient, IPatientToInsert } from '../domains/IPatient';

class Patient {
  private static table = 'patient';

  public static async createPatient(patientToInsert: IPatientToInsert): Promise<IPatient> {
    const patient = await db(this.table).insert(patientToInsert).returning('*');
    return patient[0];
  }

  public static async getAllPatients(): Promise<IPatient[]> {
    const patient = await db(this.table).returning('*');
    return patient;
  }

  public static async updatePatient(patient: IPatient): Promise<IPatient> {
    const updatedPatient = await db(this.table)
      .where({ patientId: patient.patientId })
      .update(patient)
      .returning('*');
    return updatedPatient[0];
  }

  public static async deletePatient(patientId: number): Promise<IPatient> {
    const _deletedPatient = await db(this.table).where({ patientId: patientId}).del().returning('*');
    return _deletedPatient[0];
  }
}
export default Patient;
