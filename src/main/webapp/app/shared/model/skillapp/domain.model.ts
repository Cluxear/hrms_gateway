export interface IDomain {
  id?: number;
  name?: string;
  skillId?: number;
}

export class Domain implements IDomain {
  constructor(public id?: number, public name?: string, public skillId?: number) {}
}
