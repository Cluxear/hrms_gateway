import { Moment } from 'moment';
import { LocationType } from 'app/shared/model/enumerations/location-type.model';
import { EmploymentType } from 'app/shared/model/enumerations/employment-type.model';
import { ISkill } from '../skillapp/skill.model';

export interface IJobpost {
  id?: number;
  title?: string;
  description?: string;
  estimatedSalary?: number;
  type?: LocationType;
  employmentType?: EmploymentType;
  createdAt?: Moment;
  modifiedAt?: Moment;
  degreeLevelId?: number;
  positonId?: number;
  positionName?: string;
  degreeLevelName?: string;
  skillId?: [];
  skills?: ISkill[];
}

export class Jobpost implements IJobpost {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public estimatedSalary?: number,
    public type?: LocationType,
    public employmentType?: EmploymentType,
    public createdAt?: Moment,
    public modifiedAt?: Moment,
    public degreeLevelId?: number,
    public positonId?: number,
    public positionName?: string,
    public degreeLevelName?: string,
    public skillId?: [],
    public skills?: ISkill[]
  ) {}
}
