import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISkillJobPost } from 'app/shared/model/dataapp/skill-job-post.model';

type EntityResponseType = HttpResponse<ISkillJobPost>;
type EntityArrayResponseType = HttpResponse<ISkillJobPost[]>;

@Injectable({ providedIn: 'root' })
export class SkillJobPostService {
  public resourceUrl = SERVER_API_URL + 'services/dataapp/api/skill-job-posts';

  constructor(protected http: HttpClient) {}

  create(skillJobPost: ISkillJobPost): Observable<EntityResponseType> {
    return this.http.post<ISkillJobPost>(this.resourceUrl, skillJobPost, { observe: 'response' });
  }
  createAll(skillJobPostArray: ISkillJobPost[]): Observable<EntityArrayResponseType> {
    return this.http.post<ISkillJobPost[]>(this.resourceUrl, skillJobPostArray, { observe: 'response' });
  }

  update(skillJobPost: ISkillJobPost): Observable<EntityResponseType> {
    return this.http.put<ISkillJobPost>(this.resourceUrl, skillJobPost, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISkillJobPost>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  findByJobPostId(jpid: number): Observable<EntityArrayResponseType> {
    return this.http.get<ISkillJobPost[]>(`${this.resourceUrl}/jobpost/${jpid}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISkillJobPost[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  deleteAllBy(jobPostId: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/jobpost/${jobPostId}`, { observe: 'response' });
  }
}
