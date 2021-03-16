export interface IEmployee {
  id?: string;
  salary?: number;
  phone?: number;
  userId?: string;
  positionId?: string;
  degreeId?: string;
  seniorityLevelId?: string;
}

export class Employee implements IEmployee {
  constructor(
    public id?: string,
    public salary?: number,
    public phone?: number,
    public userId?: string,
    public positionId?: string,
    public degreeId?: string,
    public seniorityLevelId?: string
  ) {}
}
