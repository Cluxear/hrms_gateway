import { ICandidate } from 'app/shared/model/userapp/candidate.model';

export interface IExperienceDuration {
  id?: number;
  value?: string;
  selected?: boolean;
  candidate?: ICandidate;
}

export class ExperienceDuration implements IExperienceDuration {
  constructor(public id?: number, public value?: string, public candidate?: ICandidate) {}
}
