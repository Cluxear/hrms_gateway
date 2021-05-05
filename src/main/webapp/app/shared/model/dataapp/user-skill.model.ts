import { SkillLevel } from 'app/shared/model/enumerations/skill-level.model';

export interface IUserSkill {
  id?: number;
  userId?: string;
  skillId?: number;
  skillLevel?: SkillLevel;
}

export class UserSkill implements IUserSkill {
  constructor(public id?: number, public userId?: string, public skillId?: number, public skillLevel?: SkillLevel) {}
}
