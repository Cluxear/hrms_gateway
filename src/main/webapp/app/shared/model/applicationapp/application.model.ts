import { Moment } from 'moment';
import { IApplicationRecrutementStatus } from 'app/shared/model/applicationapp/application-recrutement-status.model';
import { ConclusionType } from 'app/shared/model/enumerations/conclusion-type.model';

export interface IApplication {
  id?: number;
  shortListed?: boolean;
  creationDate?: Moment;
  conclusion?: ConclusionType;
  jobpostId?: number;
  position?: number;
  statuses?: IApplicationRecrutementStatus[];
  fullName?: string;
  experienceDurationName?: string;
  email?: string;
  candidateId?: string;
}

export class Application implements IApplication {
  constructor(
    public id?: number,
    public shortListed?: boolean,
    public creationDate?: Moment,
    public conclusion?: ConclusionType,
    public statuses?: IApplicationRecrutementStatus[],
    public fullName?: string,
    public email?: string,
    public position?: number,
    public experienceDurationName?: string,
    public candidateId?: string,
    jobpostId?: number
  ) {
    this.shortListed = this.shortListed || false;
  }
}
