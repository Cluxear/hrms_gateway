export interface IPosition {
  id?: number;
  jobTitle?: string;
  minSalary?: number;
  maxSalary?: number;
}

export class Position implements IPosition {
  constructor(public id?: number, public jobTitle?: string, public minSalary?: number, public maxSalary?: number) {}
}
