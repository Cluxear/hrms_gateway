import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDegreeLevel } from 'app/shared/model/jobposting/degree-level.model';

type EntityResponseType = HttpResponse<IDegreeLevel>;
type EntityArrayResponseType = HttpResponse<IDegreeLevel[]>;

@Injectable({ providedIn: 'root' })
export class DegreeLevelService {
  public resourceUrl = SERVER_API_URL + 'services/jobposting/api/degree-levels';

  constructor(protected http: HttpClient) {}

  create(degreeLevel: IDegreeLevel): Observable<EntityResponseType> {
    return this.http.post<IDegreeLevel>(this.resourceUrl, degreeLevel, { observe: 'response' });
  }

  update(degreeLevel: IDegreeLevel): Observable<EntityResponseType> {
    return this.http.put<IDegreeLevel>(this.resourceUrl, degreeLevel, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDegreeLevel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDegreeLevel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
