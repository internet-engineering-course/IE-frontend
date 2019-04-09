import API from "./API";
import { SkillBoxType } from "src/views/common/SkillBox";

export const getAllSkills = () => {
	return API.get("/skill");
};

export interface Skill {
	name: string;
	point: number;
	type?: SkillBoxType;
}

export interface EndorsableSkill {
	skill: Skill,
	endorsable: boolean
}
