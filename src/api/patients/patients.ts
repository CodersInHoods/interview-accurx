import { IPatient } from "./types";

const baseUrl = process.env.REACT_APP_API_URL;

export const patientsApi = {
  getPatients: async (searchQuery: string = ""): Promise<IPatient[]> => {
    try {
      return await fetch(`${baseUrl}/patients?search=${searchQuery}`).then(
        (resp) => resp.json()
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};
