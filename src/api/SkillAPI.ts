import API from "./API";

export const getAllSkills = () => {
	return API.get("/skill");
};

export interface Skill {
	name: string;
	point: number;
}
