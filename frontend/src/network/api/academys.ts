import api from "@/network/axiosInstance";
import { Academy } from "@/models/academy";
import { Members } from "@/models/members-list";
import { MemberPage } from "@/models/user";

export interface CreateAcademyProps {
    academy_name?: string,
    academy_location?: string,
    academy_owner?: string,
}

export async function createAcademy(acdemycredentials: CreateAcademyProps) {
    const response = await api.post<Academy>("/academy/create", acdemycredentials);
    return response.data;
}

export async function getAcademyMembers(academyId: string, page: number = 1) {

    const url = "/members?academyId=" + academyId + "&page=" + page;
    const response = await api.get<MemberPage>(url);
    return response.data;
}

// export async function getAcademyMembers(academyId: string) {
//     const response = await api.get("/academy/" + academyId + "/members");
//     console.log("Data fromn abckend " + JSON.stringify(response.data));
//     return response.data;
// }

export async function getAcademyByID(academyId: string) {
    const response = await api.get<Academy>("/academy/" + academyId);
    return response.data;
}

interface UpdateAcademyValues {
    academyId?: string,
    academy_name?: string,
    academy_location?: string,
    academyDescription?: string,
    academyPhone?: string,
    academyEmail?: string,
    academyLogo?: File,
}

export async function updateAcademy(input: UpdateAcademyValues) {
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
        if (value !== undefined) {
            formData.append(key, value);
            console.log(key + " " + value);
        } 
    });
    

    const response = await api.patch<Academy>("/academy/update/" + input.academyId, formData);
    return response.data;
}
