import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Pagination } from 'app/shared/util/request-util';
import { IUser } from './user.model';
import { ICandidate } from '../../shared/model/userapp/candidate.model';
type EntityResponseType = HttpResponse<IUser>;
@Injectable({ providedIn: 'root' })
export class UserService {
  public resourceUrl = SERVER_API_URL + 'api/users';

  constructor(private http: HttpClient) {}

  query(req?: Pagination): Observable<HttpResponse<IUser[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  update(user: IUser): Observable<EntityResponseType> {
    return this.http.put<IUser>(this.resourceUrl, user, { observe: 'response' });
  }
  findByLogin(login: string): Observable<EntityResponseType> {
    return this.http.get<IUser>(`${this.resourceUrl}/${login}`, { observe: 'response' });
  }
}
