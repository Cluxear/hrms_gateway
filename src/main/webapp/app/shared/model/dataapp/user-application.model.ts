export interface IUserApplication {
  id?: number;
  userId?: string;
  applicationId?: number;
  jobPostId?: number;
}

export class UserApplication implements IUserApplication {
  constructor(public id?: number, public userId?: string, public applicationId?: number, public jobPostId?: number) {}
}
