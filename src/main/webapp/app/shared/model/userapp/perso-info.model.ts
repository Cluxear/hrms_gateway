export interface IPersoInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export class PersoInfo implements IPersoInfo {
  constructor(public firstName?: string, public lastName?: string, email?: string) {}
}
