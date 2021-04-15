import { Moment } from 'moment';

export interface IProfessionalExperience {
  id?: number;
  place?: string;
  positionId?: number;
  description?: string;
  startDate?: Moment;
  endDate?: Moment;
  candidateId?: number;
}

export class ProfessionalExperience implements IProfessionalExperience {
  constructor(
    public id?: number,
    public place?: string,
    public positionId?: number,
    public description?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public candidateId?: number
  ) {}
}
