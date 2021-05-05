import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProfessionalExperience } from 'app/shared/model/userapp/professional-experience.model';

type EntityResponseType = HttpResponse<IProfessionalExperience>;
type EntityArrayResponseType = HttpResponse<IProfessionalExperience[]>;

@Injectable({ providedIn: 'root' })
export class ProfessionalExperienceService {
  public resourceUrl = SERVER_API_URL + 'services/userapp/api/professional-experiences';

  constructor(protected http: HttpClient) {}

  create(professionalExperience: IProfessionalExperience): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professionalExperience);
    return this.http
      .post<IProfessionalExperience>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(professionalExperience: IProfessionalExperience): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professionalExperience);
    return this.http
      .put<IProfessionalExperience>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProfessionalExperience>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProfessionalExperience[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(professionalExperience: IProfessionalExperience): IProfessionalExperience {
    const copy: IProfessionalExperience = Object.assign({}, professionalExperience, {
      startDate:
        professionalExperience.startDate && professionalExperience.startDate.isValid()
          ? professionalExperience.startDate.toJSON()
          : undefined,
      endDate:
        professionalExperience.endDate && professionalExperience.endDate.isValid() ? professionalExperience.endDate.toJSON() : undefined,
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
      res.body.forEach((professionalExperience: IProfessionalExperience) => {
        professionalExperience.startDate = professionalExperience.startDate ? moment(professionalExperience.startDate) : undefined;
        professionalExperience.endDate = professionalExperience.endDate ? moment(professionalExperience.endDate) : undefined;
      });
    }
    return res;
  }
}
