import { Moment } from 'moment';
import { InterviewType } from 'app/shared/model/enumerations/interview-type.model';
import { InterviewResult } from 'app/shared/model/enumerations/interview-result.model';

export interface IInterview {
  id?: number;
  interviewDate?: Moment;
  createdAt?: Moment;
  modifiedAt?: Moment;
  resultAttributedAt?: Moment;
  type?: InterviewType;
  result?: InterviewResult;
  isDateFixed?: boolean;
  note?: string;
  recruterId?: string;
  evaluationSheetId?: number;
}

export class Interview implements IInterview {
  constructor(
    public id?: number,
    public interviewDate?: Moment,
    public createdAt?: Moment,
    public modifiedAt?: Moment,
    public resultAttributedAt?: Moment,
    public type?: InterviewType,
    public result?: InterviewResult,
    public isDateFixed?: boolean,
    public note?: string,
    public recruterId?: string,
    public evaluationSheetId?: number
  ) {
    this.isDateFixed = this.isDateFixed || false;
  }
}
