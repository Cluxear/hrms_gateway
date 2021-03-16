import { IProfessionalExperience } from 'app/shared/model/userapp/professional-experience.model';
import { IAcademicExperience } from 'app/shared/model/userapp/academic-experience.model';
import { ICertification } from 'app/shared/model/userapp/certification.model';
import { ICountry } from 'app/shared/model/userapp/country.model';
import { IAddress } from './address.model';
import { IDegreeLevel } from './degree-level.model';
import { ISeniorityLevel } from './seniority-level.model';

export interface ICandidate {
  id?: string;
  personalStatement?: string;
  phone?: number;
  userId?: string;
  address?: IAddress;
  professionalExperiences?: IProfessionalExperience[];
  academicExperiences?: IAcademicExperience[];
  certifications?: ICertification[];
  country?: ICountry;
  degreeId?: IDegreeLevel;
  seniorityLevelId?: ISeniorityLevel;
}

export class Candidate implements ICandidate {
  constructor(
    public id?: string,
    public personalStatement?: string,
    public phone?: number,
    public userId?: string,
    public address?: IAddress,
    public professionalExperiences?: IProfessionalExperience[],
    public academicExperiences?: IAcademicExperience[],
    public certifications?: ICertification[],
    public country?: ICountry,
    public degreeId?: IDegreeLevel,
    public seniorityLevelId?: ISeniorityLevel
  ) {}
}
