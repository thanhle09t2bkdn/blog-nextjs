"use server";

// REGISTER PATIENT
export const registerPatient = async () => {
  try {
    return true;
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};
