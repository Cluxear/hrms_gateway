import { IPersoInfo } from 'app/shared/model/userapp/perso-info.model';
import {ISkill} from "app/shared/model/skillapp/skill.model";

export interface IUserDetails {
  info_perso?: IPersoInfo;
  skillList?: ISkill[];
}

export class UserDetails implements IUserDetails {
  constructor(public skillList?: ISkill[], public info_perso?: IPersoInfo) {}
}
