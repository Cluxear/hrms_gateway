import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { SeniorityLevelComponent } from 'app/entities/userapp/seniority-level/seniority-level.component';
import { SeniorityLevelService } from 'app/entities/userapp/seniority-level/seniority-level.service';
import { SeniorityLevel } from 'app/shared/model/userapp/seniority-level.model';

describe('Component Tests', () => {
  describe('SeniorityLevel Management Component', () => {
    let comp: SeniorityLevelComponent;
    let fixture: ComponentFixture<SeniorityLevelComponent>;
    let service: SeniorityLevelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [SeniorityLevelComponent],
      })
        .overrideTemplate(SeniorityLevelComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SeniorityLevelComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SeniorityLevelService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SeniorityLevel(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.seniorityLevels && comp.seniorityLevels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
