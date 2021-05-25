export interface IManagedUser {
  id?: any;
  login?: string;
  firstName?: string;
  salary?: number;
  lastName?: string;
  email?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: string[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  positionId?: number;
  degreeId?: number;
  seniorityLevelId?: number;
  lastModifiedDate?: Date;
  password?: string;

}

export class ManagedUser implements IManagedUser {
  constructor(
    public id?: any,
    public login?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public activated?: boolean,
    public langKey?: string,
    public authorities?: string[],
    public createdBy?: string,
    public createdDate?: Date,
    public salary?: number,
    public positionId?: number,
    public seniorityLevelId?: number,

    public degreeId?: number,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public password?: string
  ) {}
}
