'use server';

//  GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  try {
    return true;
  } catch (error) {
    console.error(
      'An error occurred while retrieving the recent appointments:',
      error,
    );
  }
};
