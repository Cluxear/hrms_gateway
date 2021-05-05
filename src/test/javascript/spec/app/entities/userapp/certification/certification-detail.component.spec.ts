import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { CertificationDetailComponent } from 'app/entities/userapp/certification/certification-detail.component';
import { Certification } from 'app/shared/model/userapp/certification.model';

describe('Component Tests', () => {
  describe('Certification Management Detail Component', () => {
    let comp: CertificationDetailComponent;
    let fixture: ComponentFixture<CertificationDetailComponent>;
    const route = ({ data: of({ certification: new Certification(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [CertificationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CertificationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CertificationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load certification on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.certification).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
