import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserInterview } from 'app/shared/model/dataapp/user-interview.model';

type EntityResponseType = HttpResponse<IUserInterview>;
type EntityArrayResponseType = HttpResponse<IUserInterview[]>;

@Injectable({ providedIn: 'root' })
export class UserInterviewService {
  public resourceUrl = SERVER_API_URL + 'services/dataapp/api/user-interviews';

  constructor(protected http: HttpClient) {}

  create(userInterview: IUserInterview): Observable<EntityResponseType> {
    return this.http.post<IUserInterview>(this.resourceUrl, userInterview, { observe: 'response' });
  }

  update(userInterview: IUserInterview): Observable<EntityResponseType> {
    return this.http.put<IUserInterview>(this.resourceUrl, userInterview, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserInterview>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserInterview[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  deleteWhereInterviewId(id:number) : Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/interview/${id}`, { observe: 'response' });
  }
  findByInterviewId(id:number) : Observable<EntityResponseType> {
    return this.http.get<IUserInterview>(`services/dataapp/api/application-interviews/interview/${id}`, {  observe: 'response' });
  }
}
