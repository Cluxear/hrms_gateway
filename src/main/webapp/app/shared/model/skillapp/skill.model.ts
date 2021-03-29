import { IDomain } from 'app/shared/model/skillapp/domain.model';

export interface ISkill {
  id?: number;
  name?: string;
  description?: string;
  domains?: IDomain[];
}

export class Skill implements ISkill {
  constructor(public id?: number, public name?: string, public description?: string, public domains?: IDomain[]) {}
}
