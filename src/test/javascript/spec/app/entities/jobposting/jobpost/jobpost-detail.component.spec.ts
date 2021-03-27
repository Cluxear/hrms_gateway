import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { JobpostDetailComponent } from 'app/entities/jobposting/jobpost/jobpost-detail.component';
import { Jobpost } from 'app/shared/model/jobposting/jobpost.model';

describe('Component Tests', () => {
  describe('Jobpost Management Detail Component', () => {
    let comp: JobpostDetailComponent;
    let fixture: ComponentFixture<JobpostDetailComponent>;
    const route = ({ data: of({ jobpost: new Jobpost(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [JobpostDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(JobpostDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(JobpostDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load jobpost on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.jobpost).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
