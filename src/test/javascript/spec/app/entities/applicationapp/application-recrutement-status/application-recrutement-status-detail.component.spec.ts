import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { ApplicationRecrutementStatusDetailComponent } from 'app/entities/applicationapp/application-recrutement-status/application-recrutement-status-detail.component';
import { ApplicationRecrutementStatus } from 'app/shared/model/applicationapp/application-recrutement-status.model';

describe('Component Tests', () => {
  describe('ApplicationRecrutementStatus Management Detail Component', () => {
    let comp: ApplicationRecrutementStatusDetailComponent;
    let fixture: ComponentFixture<ApplicationRecrutementStatusDetailComponent>;
    const route = ({ data: of({ applicationRecrutementStatus: new ApplicationRecrutementStatus(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [ApplicationRecrutementStatusDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ApplicationRecrutementStatusDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ApplicationRecrutementStatusDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load applicationRecrutementStatus on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.applicationRecrutementStatus).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
