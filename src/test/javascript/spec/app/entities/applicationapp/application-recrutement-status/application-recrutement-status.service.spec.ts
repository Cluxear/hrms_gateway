import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ApplicationRecrutementStatusService } from 'app/entities/applicationapp/application-recrutement-status/application-recrutement-status.service';
import {
  IApplicationRecrutementStatus,
  ApplicationRecrutementStatus,
} from 'app/shared/model/applicationapp/application-recrutement-status.model';
import { RecrutementStatus } from 'app/shared/model/enumerations/recrutement-status.model';

describe('Service Tests', () => {
  describe('ApplicationRecrutementStatus Service', () => {
    let injector: TestBed;
    let service: ApplicationRecrutementStatusService;
    let httpMock: HttpTestingController;
    let elemDefault: IApplicationRecrutementStatus;
    let expectedResult: IApplicationRecrutementStatus | IApplicationRecrutementStatus[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ApplicationRecrutementStatusService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ApplicationRecrutementStatus(0, currentDate, RecrutementStatus.PRE_SELECTED);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            addedAt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ApplicationRecrutementStatus', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            addedAt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            addedAt: currentDate,
          },
          returnedFromService
        );

        service.create(new ApplicationRecrutementStatus()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ApplicationRecrutementStatus', () => {
        const returnedFromService = Object.assign(
          {
            addedAt: currentDate.format(DATE_TIME_FORMAT),
            status: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            addedAt: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ApplicationRecrutementStatus', () => {
        const returnedFromService = Object.assign(
          {
            addedAt: currentDate.format(DATE_TIME_FORMAT),
            status: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            addedAt: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ApplicationRecrutementStatus', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
