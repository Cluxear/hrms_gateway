import { ISkill, Skill } from './skill.model';

export interface ICandidateSkillMatrix {
  skills?: ISkill[];
  firstName?: string;
}

export class CandidateSkillMatrix implements ICandidateSkillMatrix {
  constructor(public skills?: ISkill[], public firstName?: string) {}
}
