import {Moment} from "moment";


export interface IUserFileData {
  id?: number;
  filename?: string;
  url?: string;
  size?: number;
  uploadedAt?: Moment;

}

export class UserFileData implements IUserFileData {
  constructor(public uploadedAt?: Moment, public id?: number, public filename?: string, public url?: string, public size?: number) {}
}
