import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { DomainComponent } from 'app/entities/skillapp/domain/domain.component';
import { DomainService } from 'app/entities/skillapp/domain/domain.service';
import { Domain } from 'app/shared/model/skillapp/domain.model';

describe('Component Tests', () => {
  describe('Domain Management Component', () => {
    let comp: DomainComponent;
    let fixture: ComponentFixture<DomainComponent>;
    let service: DomainService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [DomainComponent],
      })
        .overrideTemplate(DomainComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DomainComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DomainService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Domain(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.domains && comp.domains[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
