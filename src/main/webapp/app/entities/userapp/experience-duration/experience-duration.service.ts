import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExperienceDuration } from 'app/shared/model/userapp/experience-duration.model';

type EntityResponseType = HttpResponse<IExperienceDuration>;
type EntityArrayResponseType = HttpResponse<IExperienceDuration[]>;

@Injectable({ providedIn: 'root' })
export class ExperienceDurationService {
  public resourceUrl = SERVER_API_URL + 'services/userapp/api/experience-durations';

  constructor(protected http: HttpClient) {}

  create(experienceDuration: IExperienceDuration): Observable<EntityResponseType> {
    return this.http.post<IExperienceDuration>(this.resourceUrl, experienceDuration, { observe: 'response' });
  }

  update(experienceDuration: IExperienceDuration): Observable<EntityResponseType> {
    return this.http.put<IExperienceDuration>(this.resourceUrl, experienceDuration, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExperienceDuration>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(): Observable<EntityArrayResponseType> {

    return this.http.get<IExperienceDuration[]>(this.resourceUrl, {  observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
