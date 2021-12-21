import { Department } from "./department";

export class Employee {
    id: number;
    username: string;
    password: string;
    email: string;
    name: string;
    contactNumber: number;
    salary: number;
    roles: any[];
    token?: string;
    department?: Department;
}