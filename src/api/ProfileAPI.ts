import API from "./API";

export const getAllSkills = () => {
	return API.get("/skill");
};

export const getUser = (userId: number) => {
	return API.get("/user/" + userId);
};

export const addUserSkill = (skillName: string) => {
	return API.put("/user", { skills: [{ name: skillName }] });
};
