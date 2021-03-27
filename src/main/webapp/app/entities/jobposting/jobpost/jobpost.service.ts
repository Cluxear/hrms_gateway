import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IJobpost } from 'app/shared/model/jobposting/jobpost.model';

type EntityResponseType = HttpResponse<IJobpost>;
type EntityArrayResponseType = HttpResponse<IJobpost[]>;

@Injectable({ providedIn: 'root' })
export class JobpostService {
  public resourceUrl = SERVER_API_URL + 'services/jobposting/api/job-posts';

  constructor(protected http: HttpClient) {}

  create(jobpost: IJobpost): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jobpost);
    return this.http
      .post<IJobpost>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(jobpost: IJobpost): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jobpost);
    return this.http
      .put<IJobpost>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IJobpost>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IJobpost[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(jobpost: IJobpost): IJobpost {
    const copy: IJobpost = Object.assign({}, jobpost, {
      createdAt: jobpost.createdAt && jobpost.createdAt.isValid() ? jobpost.createdAt.toJSON() : undefined,
      modifiedAt: jobpost.modifiedAt && jobpost.modifiedAt.isValid() ? jobpost.modifiedAt.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt ? moment(res.body.createdAt) : undefined;
      res.body.modifiedAt = res.body.modifiedAt ? moment(res.body.modifiedAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((jobpost: IJobpost) => {
        jobpost.createdAt = jobpost.createdAt ? moment(jobpost.createdAt) : undefined;
        jobpost.modifiedAt = jobpost.modifiedAt ? moment(jobpost.modifiedAt) : undefined;
      });
    }
    return res;
  }
}
