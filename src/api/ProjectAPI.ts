import API from "./API";
import axios from "axios";
import { Skill } from "./SkillAPI";

export const getProject = (projectId: string) => {
	return API.get("/project/" + projectId);
};

export const getAllProjects = (pageSize:number , pageNumber:number) => {
	return API.get("/project?pageSize=" + pageSize + "&pageNumber=" + pageNumber);
};

export const bidProject = (projectId:string , bidAmount:number) =>{
    return API.post("/project/" + projectId + "/bid" , {bidAmount:bidAmount})
}

export const isBidBefore = (projectId:string) =>{
    return API.get("/project/" + projectId + "/bid");
}

export const getProjectWinner = (projectId:string) =>{
    return API.get("/project/" + projectId + "/auction");
}

export const searchProject =(filter:string, pageSize:number, pageNumber:number)=>{
    return API.get("/project/search?filter=" + filter + "&pageSize=" + pageSize + "&pageNumber=" + pageNumber);
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