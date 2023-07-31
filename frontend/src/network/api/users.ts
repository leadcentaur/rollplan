import { User } from "@/models/user";
import api from "@/network/axiosInstance";

export async function getAuthenticatedUser() {
    const response = await api.get<User>("/users/me");
    return response.data;
}

export async function getUserByUsername(username: string) {
    const response = await api.get<User>("/users/profile/" + username);
    return response.data;
}

interface CustomerValidationValues {
    username: string,
    email: string,
    academy_name: string,
}

export async function customerValidator(validationObject: CustomerValidationValues) {
    const response = await api.post("/onboarding/customer/validation", validationObject);
    return response.data;
}

export interface SignUpValues {
    username: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    numberOfStripes: string,
    userType: string,
    belt: string,
    verificationCode: string,
}

export async function signUp(credentials: SignUpValues) {
    credentials.userType = "owner";
    const response = await api.post<User>("/users/signup", credentials);
    return response.data;
}

export async function requestEmailVerificationCode(email: string) {
    await api.post("/users/verification-code", {email});
}

interface LoginValues {
    username: string,
    password: string,
}

export async function login(credentials: LoginValues) {
    const response = await api.post<User>("/users/login", credentials);
    return response.data;
}

export async function logout() {
    await api.post("/users/logout");
}

interface UpdateUserValues {
    username?: string,
    firstname?: string,
    displayName?: string,
    lastname?: string,
    about?: string,
    academyReferenceId?: string,
    profilePic?: File,
}

export async function updateUser(input: UpdateUserValues) {
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
    });
    const response = await api.patch<User>("/users/me", formData);
    return response.data;
}

export interface SetAcademyReferenceIdValues {
    userId?: string,
    academyReferenceId?: string,
}

export async function setAcademyReferenceId(input: SetAcademyReferenceIdValues) {
    const response = await api.patch<User>("/users/setRefId/", input);
    return response.data;
}