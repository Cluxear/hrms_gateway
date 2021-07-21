export interface IEmployee {
  id?: string;
  salary?: number;
  phone?: number;
  userId?: string;
  positionId?: number;
  positionName?: string;
  degreeName?: string;
  degreeId?: number;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  seniorityLevelId?: number;
  seniorityLevelName?: string;

}

export class Employee implements IEmployee {
  constructor(
    public id?: string,
    public salary?: number,
    public phone?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public login?: string,
    public userId?: string,
    public positionId?: number,
    public  positionName?: string,
    public degreeName?: string,
    public degreeId?: number,
    public seniorityLevelId?: number,
    public seniorityLevelName?: string


) {}
}
