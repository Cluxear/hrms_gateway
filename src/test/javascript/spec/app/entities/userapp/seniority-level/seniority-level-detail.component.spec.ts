import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { SeniorityLevelDetailComponent } from 'app/entities/userapp/seniority-level/seniority-level-detail.component';
import { SeniorityLevel } from 'app/shared/model/userapp/seniority-level.model';

describe('Component Tests', () => {
  describe('SeniorityLevel Management Detail Component', () => {
    let comp: SeniorityLevelDetailComponent;
    let fixture: ComponentFixture<SeniorityLevelDetailComponent>;
    const route = ({ data: of({ seniorityLevel: new SeniorityLevel(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [SeniorityLevelDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SeniorityLevelDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SeniorityLevelDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load seniorityLevel on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.seniorityLevel).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
