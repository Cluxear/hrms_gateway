export interface ISkillJobPost {
  id?: number;
  skillId?: number;
  jobPostId?: number;
}

export class SkillJobPost implements ISkillJobPost {
  constructor(public id?: number, public skillId?: number, public jobPostId?: number) {}
}
