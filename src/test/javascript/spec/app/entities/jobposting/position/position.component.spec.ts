import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { PositionComponent } from 'app/entities/jobposting/position/position.component';
import { PositionService } from 'app/entities/jobposting/position/position.service';
import { Position } from 'app/shared/model/jobposting/position.model';

describe('Component Tests', () => {
  describe('Position Management Component', () => {
    let comp: PositionComponent;
    let fixture: ComponentFixture<PositionComponent>;
    let service: PositionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [PositionComponent],
      })
        .overrideTemplate(PositionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PositionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PositionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Position(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.positions && comp.positions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
