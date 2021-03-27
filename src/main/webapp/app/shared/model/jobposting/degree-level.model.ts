export interface IDegreeLevel {
  id?: number;
  name?: string;
}

export class DegreeLevel implements IDegreeLevel {
  constructor(public id?: number, public name?: string) {}
}
