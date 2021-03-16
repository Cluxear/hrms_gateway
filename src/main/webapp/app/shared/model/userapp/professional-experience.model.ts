import { Moment } from 'moment';

export interface IProfessionalExperience {
  id?: number;
  place?: string;
  post?: string;
  description?: string;
  startDate?: Moment;
  endDate?: Moment;
  candidateId?: number;
}

export class ProfessionalExperience implements IProfessionalExperience {
  constructor(
    public id?: number,
    public place?: string,
    public post?: string,
    public description?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public candidateId?: number
  ) {}
}
