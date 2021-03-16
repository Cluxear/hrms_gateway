export interface ICertification {
  id?: number;
  title?: string;
  description?: string;
  candidateId?: number;
}

export class Certification implements ICertification {
  constructor(public id?: number, public title?: string, public description?: string, public candidateId?: number) {}
}
