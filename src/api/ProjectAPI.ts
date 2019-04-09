import API from "./API";
import { Skill } from "./SkillAPI";

export const getProject = (projectId: number) => {
	return API.get("project/" + projectId);
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