import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { DegreeLevelDetailComponent } from 'app/entities/jobposting/degree-level/degree-level-detail.component';
import { DegreeLevel } from 'app/shared/model/jobposting/degree-level.model';

describe('Component Tests', () => {
  describe('DegreeLevel Management Detail Component', () => {
    let comp: DegreeLevelDetailComponent;
    let fixture: ComponentFixture<DegreeLevelDetailComponent>;
    const route = ({ data: of({ degreeLevel: new DegreeLevel(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [DegreeLevelDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DegreeLevelDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DegreeLevelDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load degreeLevel on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.degreeLevel).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
