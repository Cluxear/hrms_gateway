export interface IEvaluationSheet {
  id?: number;
  atout?: string;
  faibless?: string;
}

export class EvaluationSheet implements IEvaluationSheet {
  constructor(public id?: number, public atout?: string, public faibless?: string) {}
}
