import { IPersoInfo } from 'app/shared/model/userapp/perso-info.model';

export interface IUserDetails {
  persoInfo?: IPersoInfo;
}

export class UserDetails implements IUserDetails {
  constructor(public persoInfo?: IPersoInfo) {}
}
