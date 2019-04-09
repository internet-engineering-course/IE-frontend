import API from "./API";
import { Skill } from "./SkillAPI";

export const getUser = (userId: number) => {
	return API.get("/user/" + userId);
};

export const addUserSkill = (skillName: string) => {
	return API.put("/user", { skills: [{ name: skillName }] });
};

export const deleteUserSkill = (skillName: string) => {
	return API.delete("/user", { data: { skills: [{ name: skillName }] } });
};

export const getEndorsableSkills = (userId: string) => {
	return API.get('/user/' + userId + '/endorse')
}

export const endorseUserSkill = (skillName: string, userId: number) => {
	return API.post("user/" + userId + "/endorse", { skillName: skillName });
};

export interface User {
	id: number;
	username: string;
	firstname: string;
	lastname: string;
	jobTitle: string;
	bio: string;
	skills: Skill[];
}
