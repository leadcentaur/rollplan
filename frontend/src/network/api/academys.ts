import api from "@/network/axiosInstance";
import { Academy } from "@/models/academy";

export interface AcademyCredentials {
    academy_name: string,
    academy_location: string,
    academy_owner: string,
}

export async function createAcademy(acdemycredentials: AcademyCredentials) {
    const response = await api.post<Academy>("/academy/create", acdemycredentials);
    return response.data;
}