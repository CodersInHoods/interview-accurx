import { IPatient } from "./types";

const baseUrl = process.env.REACT_APP_API_URL;

export const patientsApi = {
  getPatients: async (searchQuery: string = ""): Promise<IPatient[]> => {
    return await fetch(`${baseUrl}/patients?search=${searchQuery}`).then(
      (resp) => (resp.ok ? resp.json() : [])
    );
  },
};
