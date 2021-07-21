export interface IUserInterview {
  id?: number;
  applicationId?: number;
  userId?: string;
  interviewId?: number;
  recruterId?: string;
}

export class UserInterview implements IUserInterview {
  constructor(  public recruterId?: string, public id?: number, public userId?: string, public applicationId?: number, public interviewId?: number) {}
}
