import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { InterviewService } from 'app/entities/interviewapp/interview/interview.service';
import { IInterview, Interview } from 'app/shared/model/interviewapp/interview.model';
import { InterviewType } from 'app/shared/model/enumerations/interview-type.model';
import { InterviewResult } from 'app/shared/model/enumerations/interview-result.model';

describe('Service Tests', () => {
  describe('Interview Service', () => {
    let injector: TestBed;
    let service: InterviewService;
    let httpMock: HttpTestingController;
    let elemDefault: IInterview;
    let expectedResult: IInterview | IInterview[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(InterviewService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Interview(
        0,
        currentDate,
        currentDate,
        currentDate,
        currentDate,
        InterviewType.TECHNICAL_INTERVIEW,
        InterviewResult.POSITIVE,
        false,
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            interviewDate: currentDate.format(DATE_TIME_FORMAT),
            createdAt: currentDate.format(DATE_TIME_FORMAT),
            modifiedAt: currentDate.format(DATE_TIME_FORMAT),
            resultAttributedAt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Interview', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            interviewDate: currentDate.format(DATE_TIME_FORMAT),
            createdAt: currentDate.format(DATE_TIME_FORMAT),
            modifiedAt: currentDate.format(DATE_TIME_FORMAT),
            resultAttributedAt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            interviewDate: currentDate,
            createdAt: currentDate,
            modifiedAt: currentDate,
            resultAttributedAt: currentDate,
          },
          returnedFromService
        );

        service.create(new Interview()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Interview', () => {
        const returnedFromService = Object.assign(
          {
            interviewDate: currentDate.format(DATE_TIME_FORMAT),
            createdAt: currentDate.format(DATE_TIME_FORMAT),
            modifiedAt: currentDate.format(DATE_TIME_FORMAT),
            resultAttributedAt: currentDate.format(DATE_TIME_FORMAT),
            type: 'BBBBBB',
            result: 'BBBBBB',
            isDateFixed: true,
            note: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            interviewDate: currentDate,
            createdAt: currentDate,
            modifiedAt: currentDate,
            resultAttributedAt: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Interview', () => {
        const returnedFromService = Object.assign(
          {
            interviewDate: currentDate.format(DATE_TIME_FORMAT),
            createdAt: currentDate.format(DATE_TIME_FORMAT),
            modifiedAt: currentDate.format(DATE_TIME_FORMAT),
            resultAttributedAt: currentDate.format(DATE_TIME_FORMAT),
            type: 'BBBBBB',
            result: 'BBBBBB',
            isDateFixed: true,
            note: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            interviewDate: currentDate,
            createdAt: currentDate,
            modifiedAt: currentDate,
            resultAttributedAt: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Interview', () => {
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
