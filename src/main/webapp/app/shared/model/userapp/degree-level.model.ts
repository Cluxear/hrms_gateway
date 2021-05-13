import { ICandidate } from 'app/shared/model/userapp/candidate.model';
import { IEmployee } from 'app/shared/model/userapp/employee.model';

export interface IDegreeLevel {
  selected?: boolean;
  id?: number;
  name?: string;
  candidates?: ICandidate[];
  employes?: IEmployee[];
}

export class DegreeLevel implements IDegreeLevel {
  constructor(public id?: number, public name?: string, public candidates?: ICandidate[], public employes?: IEmployee[], public selected?: boolean) {}
}
