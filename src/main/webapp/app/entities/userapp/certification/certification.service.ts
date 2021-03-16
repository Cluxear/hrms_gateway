import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICertification } from 'app/shared/model/userapp/certification.model';

type EntityResponseType = HttpResponse<ICertification>;
type EntityArrayResponseType = HttpResponse<ICertification[]>;

@Injectable({ providedIn: 'root' })
export class CertificationService {
  public resourceUrl = SERVER_API_URL + 'services/userapp/api/certifications';

  constructor(protected http: HttpClient) {}

  create(certification: ICertification): Observable<EntityResponseType> {
    return this.http.post<ICertification>(this.resourceUrl, certification, { observe: 'response' });
  }

  update(certification: ICertification): Observable<EntityResponseType> {
    return this.http.put<ICertification>(this.resourceUrl, certification, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICertification>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICertification[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
