import API from "./API";
import { Skill } from "./SkillAPI";

export const getProject = (projectId: string) => {
	return API.get("/project/" + projectId);
};

export const getAllProjects = () => {
	return API.get("/project");
};

export interface Project{
    id: string,
    title: string,
    description: string,
    imageUrl: string,
    budget: number,
    deadline: number,
    skills: Skill[]
}