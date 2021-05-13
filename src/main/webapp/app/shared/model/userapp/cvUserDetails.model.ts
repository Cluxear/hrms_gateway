import { IPersoInfo } from 'app/shared/model/userapp/perso-info.model';

export interface IUserDetails {
  info_perso?: IPersoInfo;
}

export class UserDetails implements IUserDetails {
  constructor(public info_perso?: IPersoInfo) {}
}
