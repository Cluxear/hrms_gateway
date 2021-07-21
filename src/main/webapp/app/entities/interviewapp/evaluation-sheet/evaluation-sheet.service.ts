import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEvaluationSheet } from 'app/shared/model/interviewapp/evaluation-sheet.model';

type EntityResponseType = HttpResponse<IEvaluationSheet>;
type EntityArrayResponseType = HttpResponse<IEvaluationSheet[]>;

@Injectable({ providedIn: 'root' })
export class EvaluationSheetService {
  public resourceUrl = SERVER_API_URL + 'services/interviewapp/api/evaluation-sheets';

  constructor(protected http: HttpClient) {}

  create(evaluationSheet: IEvaluationSheet): Observable<EntityResponseType> {
    return this.http.post<IEvaluationSheet>(this.resourceUrl, evaluationSheet, { observe: 'response' });
  }

  update(evaluationSheet: IEvaluationSheet): Observable<EntityResponseType> {
    return this.http.put<IEvaluationSheet>(this.resourceUrl, evaluationSheet, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEvaluationSheet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEvaluationSheet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
