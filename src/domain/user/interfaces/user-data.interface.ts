import { Gender } from "../../../utils/enum/gender.enum";

export interface CreateUserData {
    name: string;
    email: string;
    password: string;
    birthdate: string;
    gender: Gender;
    phone: string;
    cpf: string;
}

export interface UpdateUserData {
    name: string;
    gender: Gender;
    phone: string;
    active: boolean;
}

