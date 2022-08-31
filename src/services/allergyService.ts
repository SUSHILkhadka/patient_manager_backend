import StatusCodes from "http-status-codes";
import { ISuccess } from "../domains/ISuccess";
import AllergyModel from "../models/allergyModel";
import logger from "../misc/Logger";
import CustomError from "../middlewares/CustomError";
import { IAllergy, IAllergyToInsert } from "../domains/IAllergy";

export const addAllergy = async (
  allergyToInsert: IAllergyToInsert
): Promise<ISuccess<IAllergy>> => {
  logger.info("creating new allergy");
  const allergy = await AllergyModel.addAllergy(allergyToInsert);
  logger.info("created new allergy successfully");
  return {
    data: allergy,
    message: "new allergy created successfully",
  };
};
export const getAllAllergiesByPatientId = async (
  patientId: number
): Promise<ISuccess<IAllergy[]>> => {
  logger.info("fetching all allergies of patient id = " + patientId);

  const allergies = await AllergyModel.getAllAllergiesByPatientId(patientId);
  if (!allergies.length) {
    throw new CustomError("allergies list is empty", StatusCodes.NOT_FOUND);
  }
  logger.info("allergy list fetched successfully ");
  return {
    data: allergies,
    message: "allergy list fetched successfully",
  };
};

export const updateAllergy = async (
  allergy: IAllergy
): Promise<ISuccess<IAllergy>> => {
  logger.info("updating allergy  by id = " + allergy.id);
  const updatedAllergy = await AllergyModel.updateAllergy(allergy);
  if (!updatedAllergy) {
    throw new CustomError(
      "allergy  doesn't exist to edit",
      StatusCodes.NOT_FOUND
    );
  }
  logger.info("updated allergy by id");
  return {
    data: updatedAllergy,
    message: "updated allergy by id successfully",
  };
};

export const deleteAllergy = async (
  id: number
): Promise<ISuccess<IAllergy>> => {
  logger.info("deleting allergy by id = " + id);
  const patient = await AllergyModel.deleteAllergy(id);
  if (!patient) {
    throw new CustomError(
      "Couldnot delete the requested allergy",
      StatusCodes.NOT_FOUND
    );
  }
  logger.info("deleted allergy by id");
  return {
    data: patient,
    message: "deleted allergy by id successfully",
  };
};
