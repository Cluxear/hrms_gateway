import { IEmployee } from 'app/shared/model/userapp/employee.model';
import { ICandidate } from 'app/shared/model/userapp/candidate.model';

export interface ISeniorityLevel {
  id?: number;
  name?: string;
  employes?: IEmployee[];
  candidates?: ICandidate[];
}

export class SeniorityLevel implements ISeniorityLevel {
  constructor(public id?: number, public name?: string, public employes?: IEmployee[], public candidates?: ICandidate[]) {}
}
