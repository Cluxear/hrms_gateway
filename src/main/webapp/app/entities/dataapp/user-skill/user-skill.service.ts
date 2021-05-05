import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserSkill } from 'app/shared/model/dataapp/user-skill.model';

type EntityResponseType = HttpResponse<IUserSkill>;
type EntityArrayResponseType = HttpResponse<IUserSkill[]>;

@Injectable({ providedIn: 'root' })
export class UserSkillService {
  public resourceUrl = SERVER_API_URL + 'services/dataapp/api/user-skills';

  constructor(protected http: HttpClient) {}

  create(userSkill: IUserSkill): Observable<EntityResponseType> {
    return this.http.post<IUserSkill>(this.resourceUrl, userSkill, { observe: 'response' });
  }

  update(userSkill: IUserSkill): Observable<EntityResponseType> {
    return this.http.put<IUserSkill>(this.resourceUrl, userSkill, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserSkill>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserSkill[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
