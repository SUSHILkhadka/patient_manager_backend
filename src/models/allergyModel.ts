import db from '../db/db';
import { IAllergy, IAllergyToInsert } from '../domains/IAllergy';

class User {
  private static table = 'allergies';

  public static async addAllergy(allergyToInsert: IAllergyToInsert): Promise<IAllergy> {
    const allergies = await db(this.table).insert(allergyToInsert).returning('*');
    return allergies[0];
  }

  public static async getAllAllergiesByPatientId(patientId: number): Promise<IAllergy[]> {
    const allergies = await db(this.table).where({ patientId: patientId }).returning('*');
    return allergies;
  }

  public static async updateAllergy(allergy: IAllergy): Promise<IAllergy> {
    const updatedPatient = await db(this.table)
      .where({ patientId: allergy.patientId, id: allergy.id })
      .update(allergy)
      .returning('*');
    return updatedPatient[0];
  }
  public static async deleteAllergy(id: number): Promise<IAllergy> {
    const deletedAllergy = await db(this.table).where('id', id).del().returning('*');
    return deletedAllergy[0];
  }
}
export default User;
