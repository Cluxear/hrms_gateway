import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { ApplicationRecrutementStatusComponent } from 'app/entities/applicationapp/application-recrutement-status/application-recrutement-status.component';
import { ApplicationRecrutementStatusService } from 'app/entities/applicationapp/application-recrutement-status/application-recrutement-status.service';
import { ApplicationRecrutementStatus } from 'app/shared/model/applicationapp/application-recrutement-status.model';

describe('Component Tests', () => {
  describe('ApplicationRecrutementStatus Management Component', () => {
    let comp: ApplicationRecrutementStatusComponent;
    let fixture: ComponentFixture<ApplicationRecrutementStatusComponent>;
    let service: ApplicationRecrutementStatusService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [ApplicationRecrutementStatusComponent],
      })
        .overrideTemplate(ApplicationRecrutementStatusComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ApplicationRecrutementStatusComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ApplicationRecrutementStatusService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ApplicationRecrutementStatus(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.applicationRecrutementStatuses && comp.applicationRecrutementStatuses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
