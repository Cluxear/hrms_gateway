import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { DegreeLevelUpdateComponent } from 'app/entities/userapp/degree-level/degree-level-update.component';
import { DegreeLevelService } from 'app/entities/userapp/degree-level/degree-level.service';
import { DegreeLevel } from 'app/shared/model/userapp/degree-level.model';

describe('Component Tests', () => {
  describe('DegreeLevel Management Update Component', () => {
    let comp: DegreeLevelUpdateComponent;
    let fixture: ComponentFixture<DegreeLevelUpdateComponent>;
    let service: DegreeLevelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [DegreeLevelUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DegreeLevelUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DegreeLevelUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DegreeLevelService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DegreeLevel(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new DegreeLevel();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
