import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISkill } from 'app/shared/model/skillapp/skill.model';
import { ICandidateSkillMatrix } from '../../../shared/model/skillapp/CandidateSkillMatrix';

type EntityResponseType = HttpResponse<ISkill>;
type EntityArrayResponseType = HttpResponse<ISkill[]>;

@Injectable({ providedIn: 'root' })
export class SkillService {
  public resourceUrl = SERVER_API_URL + 'services/skillapp/api/skills';

  constructor(protected http: HttpClient) {}

  create(skill: ISkill): Observable<EntityResponseType> {
    return this.http.post<ISkill>(this.resourceUrl, skill, { observe: 'response' });
  }

  update(skill: ISkill): Observable<EntityResponseType> {
    return this.http.put<ISkill>(this.resourceUrl, skill, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISkill>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISkill[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  findJpSkills(jpid: number): Observable<EntityArrayResponseType> {
    return this.http.get<ISkill[]>(`${this.resourceUrl}/jobpostid/${jpid}`, { observe: 'response' });
  }
  findSkillsByUserId(id: string): Observable<EntityArrayResponseType> {
    return this.http.get<ISkill[]>(`${this.resourceUrl}/userId/${id}`, { observe: 'response' });
  }

  findCandidateSkillsByJobPostId(id: number): Observable<HttpResponse<ICandidateSkillMatrix[]>> {
    return this.http.get<ICandidateSkillMatrix[]>(`${this.resourceUrl}/matrix/jobpostId/${id}`, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
