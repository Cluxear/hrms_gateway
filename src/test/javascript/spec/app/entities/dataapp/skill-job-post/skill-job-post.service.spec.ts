import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SkillJobPostService } from 'app/entities/dataapp/skill-job-post/skill-job-post.service';
import { ISkillJobPost, SkillJobPost } from 'app/shared/model/dataapp/skill-job-post.model';

describe('Service Tests', () => {
  describe('SkillJobPost Service', () => {
    let injector: TestBed;
    let service: SkillJobPostService;
    let httpMock: HttpTestingController;
    let elemDefault: ISkillJobPost;
    let expectedResult: ISkillJobPost | ISkillJobPost[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SkillJobPostService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new SkillJobPost(0, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a SkillJobPost', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new SkillJobPost()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SkillJobPost', () => {
        const returnedFromService = Object.assign(
          {
            skillId: 1,
            jobPostId: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of SkillJobPost', () => {
        const returnedFromService = Object.assign(
          {
            skillId: 1,
            jobPostId: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a SkillJobPost', () => {
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
