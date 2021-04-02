import { IDomain } from 'app/shared/model/skillapp/domain.model';
import { SkillLevel } from '../enumerations/skill_level.models';

export interface ISkill {
  id?: number;
  name?: string;
  description?: string;
  domains?: IDomain[];
  skillLevel?: SkillLevel;
}

export class Skill implements ISkill {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public domains?: IDomain[],
    public skillLevel?: SkillLevel
  ) {}
}
