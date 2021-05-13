export interface IDegreeLevel {
  id?: number;
  name?: string;
  selected?: boolean;
}

export class DegreeLevel implements IDegreeLevel {
  constructor(public id?: number, public name?: string, public selected?: boolean) {}
}
