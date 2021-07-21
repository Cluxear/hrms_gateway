import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInterview } from 'app/shared/model/interviewapp/interview.model';

type EntityResponseType = HttpResponse<IInterview>;
type EntityArrayResponseType = HttpResponse<IInterview[]>;

@Injectable({ providedIn: 'root' })
export class InterviewService {
  public resourceUrl = SERVER_API_URL + 'services/interviewapp/api/interviews';

  constructor(protected http: HttpClient) {}

  create(interview: IInterview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(interview);
    return this.http
      .post<IInterview>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(interview: IInterview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(interview);
    return this.http
      .put<IInterview>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInterview>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInterview[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  getByApplicationId(applicationId: number) : Observable<EntityArrayResponseType> {


    return this.http
      .get<IInterview[]>(`${this.resourceUrl}/application/${applicationId}`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(interview: IInterview): IInterview {
    const copy: IInterview = Object.assign({}, interview, {
      interviewDate: interview.interviewDate && interview.interviewDate.isValid() ? interview.interviewDate.toJSON() : undefined,
      createdAt: interview.createdAt && interview.createdAt.isValid() ? interview.createdAt.toJSON() : undefined,
      modifiedAt: interview.modifiedAt && interview.modifiedAt.isValid() ? interview.modifiedAt.toJSON() : undefined,
      resultAttributedAt:
        interview.resultAttributedAt && interview.resultAttributedAt.isValid() ? interview.resultAttributedAt.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.interviewDate = res.body.interviewDate ? moment(res.body.interviewDate) : undefined;
      res.body.createdAt = res.body.createdAt ? moment(res.body.createdAt) : undefined;
      res.body.modifiedAt = res.body.modifiedAt ? moment(res.body.modifiedAt) : undefined;
      res.body.resultAttributedAt = res.body.resultAttributedAt ? moment(res.body.resultAttributedAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((interview: IInterview) => {
        interview.interviewDate = interview.interviewDate ? moment(interview.interviewDate) : undefined;
        interview.createdAt = interview.createdAt ? moment(interview.createdAt) : undefined;
        interview.modifiedAt = interview.modifiedAt ? moment(interview.modifiedAt) : undefined;
        interview.resultAttributedAt = interview.resultAttributedAt ? moment(interview.resultAttributedAt) : undefined;
      });
    }
    return res;
  }
}
