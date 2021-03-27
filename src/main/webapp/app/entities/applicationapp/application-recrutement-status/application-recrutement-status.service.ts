import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IApplicationRecrutementStatus } from 'app/shared/model/applicationapp/application-recrutement-status.model';

type EntityResponseType = HttpResponse<IApplicationRecrutementStatus>;
type EntityArrayResponseType = HttpResponse<IApplicationRecrutementStatus[]>;

@Injectable({ providedIn: 'root' })
export class ApplicationRecrutementStatusService {
  public resourceUrl = SERVER_API_URL + 'services/applicationapp/api/application-recrutement-statuses';

  constructor(protected http: HttpClient) {}

  create(applicationRecrutementStatus: IApplicationRecrutementStatus): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(applicationRecrutementStatus);
    return this.http
      .post<IApplicationRecrutementStatus>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(applicationRecrutementStatus: IApplicationRecrutementStatus): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(applicationRecrutementStatus);
    return this.http
      .put<IApplicationRecrutementStatus>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IApplicationRecrutementStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IApplicationRecrutementStatus[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(applicationRecrutementStatus: IApplicationRecrutementStatus): IApplicationRecrutementStatus {
    const copy: IApplicationRecrutementStatus = Object.assign({}, applicationRecrutementStatus, {
      addedAt:
        applicationRecrutementStatus.addedAt && applicationRecrutementStatus.addedAt.isValid()
          ? applicationRecrutementStatus.addedAt.toJSON()
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.addedAt = res.body.addedAt ? moment(res.body.addedAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((applicationRecrutementStatus: IApplicationRecrutementStatus) => {
        applicationRecrutementStatus.addedAt = applicationRecrutementStatus.addedAt
          ? moment(applicationRecrutementStatus.addedAt)
          : undefined;
      });
    }
    return res;
  }
}
