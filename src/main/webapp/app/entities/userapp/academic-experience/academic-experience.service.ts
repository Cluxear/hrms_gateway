import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAcademicExperience } from 'app/shared/model/userapp/academic-experience.model';

type EntityResponseType = HttpResponse<IAcademicExperience>;
type EntityArrayResponseType = HttpResponse<IAcademicExperience[]>;

@Injectable({ providedIn: 'root' })
export class AcademicExperienceService {
  public resourceUrl = SERVER_API_URL + 'services/userapp/api/academic-experiences';

  constructor(protected http: HttpClient) {}

  create(academicExperience: IAcademicExperience): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(academicExperience);
    return this.http
      .post<IAcademicExperience>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(academicExperience: IAcademicExperience): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(academicExperience);
    return this.http
      .put<IAcademicExperience>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAcademicExperience>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAcademicExperience[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(academicExperience: IAcademicExperience): IAcademicExperience {
    const copy: IAcademicExperience = Object.assign({}, academicExperience, {
      startDate: academicExperience.startDate && academicExperience.startDate.isValid() ? academicExperience.startDate.toJSON() : undefined,
      endDate: academicExperience.endDate && academicExperience.endDate.isValid() ? academicExperience.endDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((academicExperience: IAcademicExperience) => {
        academicExperience.startDate = academicExperience.startDate ? moment(academicExperience.startDate) : undefined;
        academicExperience.endDate = academicExperience.endDate ? moment(academicExperience.endDate) : undefined;
      });
    }
    return res;
  }
}
