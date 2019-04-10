import API from "./API";
import { Skill } from "./SkillAPI";

export const getProject = (projectId: string) => {
	return API.get("/project/" + projectId);
};

export const getAllProjects = () => {
	return API.get("/project");
};

export const bidProject = (projectId:string , bidAmount:number) =>{
    return API.post("/project/" + projectId + "/bid" , {bidAmount:bidAmount})
}

export const isBidBefore = (projectId:string) =>{
    return API.get("/project/" + projectId + "/bid");
}
export interface Project{
    id: string,
    title: string,
    description: string,
    imageUrl: string,
    budget: number,
    deadline: number,
    skills: Skill[]
}