import { Moment } from 'moment';

export interface IAcademicExperience {
  id?: number;
  place?: string;
  degreeName?: string;
  description?: string;
  startDate?: Moment;
  endDate?: Moment;
  candidateId?: number;
}

export class AcademicExperience implements IAcademicExperience {
  constructor(
    public id?: number,
    public place?: string,
    public degreeName?: string,
    public description?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public candidateId?: number
  ) {}
}
