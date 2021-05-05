import { Moment } from 'moment';
import { RecrutementStatus } from 'app/shared/model/enumerations/recrutement-status.model';

export interface IApplicationRecrutementStatus {
  id?: number;
  addedAt?: Moment;
  status?: RecrutementStatus;
  applicationId?: number;
}

export class ApplicationRecrutementStatus implements IApplicationRecrutementStatus {
  constructor(public id?: number, public addedAt?: Moment, public status?: RecrutementStatus, public applicationId?: number) {}
}
