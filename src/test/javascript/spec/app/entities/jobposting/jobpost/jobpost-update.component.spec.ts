import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { JobpostUpdateComponent } from 'app/entities/jobposting/jobpost/jobpost-update.component';
import { JobpostService } from 'app/entities/jobposting/jobpost/jobpost.service';
import { Jobpost } from 'app/shared/model/jobposting/jobpost.model';

describe('Component Tests', () => {
  describe('Jobpost Management Update Component', () => {
    let comp: JobpostUpdateComponent;
    let fixture: ComponentFixture<JobpostUpdateComponent>;
    let service: JobpostService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [JobpostUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(JobpostUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(JobpostUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JobpostService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Jobpost(123);
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
        const entity = new Jobpost();
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
