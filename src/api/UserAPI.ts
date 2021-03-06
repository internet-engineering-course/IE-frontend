import API from "./API";
import { Skill } from "./SkillAPI";

export const getAllUser = () =>{
	return API.get("/user");
};

export const getUser = (username: string) => {
	return API.get("/user/" + username);
};

export const addUserSkill = (skillName: string) => {
	return API.put("/user", { skills: [{ name: skillName }] });
};

export const deleteUserSkill = (skillName: string) => {
	return API.delete("/user", { data: { skills: [{ name: skillName }] } });
};

export const getEndorsableSkills = (username: string) => {
	return API.get('/user/' + username + '/endorse')
}

export const endorseUserSkill = (skillName: string, username: string) => {
	return API.post("user/" + username + "/endorse", { skillName: skillName });
};

export const searchUser = (filter:string) => {
    return API.get("/user/search?filter="+filter);
}

export interface User {
	id: number;
	username: string;
	firstname: string;
	lastname: string;
	jobTitle: string;
	imageUrl: string;
	bio: string;
	skills: Skill[];
}
