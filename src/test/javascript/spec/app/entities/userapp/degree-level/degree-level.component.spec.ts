import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { DegreeLevelComponent } from 'app/entities/userapp/degree-level/degree-level.component';
import { DegreeLevelService } from 'app/entities/userapp/degree-level/degree-level.service';
import { DegreeLevel } from 'app/shared/model/userapp/degree-level.model';

describe('Component Tests', () => {
  describe('DegreeLevel Management Component', () => {
    let comp: DegreeLevelComponent;
    let fixture: ComponentFixture<DegreeLevelComponent>;
    let service: DegreeLevelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [DegreeLevelComponent],
      })
        .overrideTemplate(DegreeLevelComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DegreeLevelComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DegreeLevelService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DegreeLevel(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.degreeLevels && comp.degreeLevels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
