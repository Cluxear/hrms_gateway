import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { UserFileDataUpdateComponent } from 'app/entities/userapp/user-file-data/user-file-data-update.component';
import { UserFileDataService } from 'app/entities/userapp/user-file-data/user-file-data.service';
import { UserFileData } from 'app/shared/model/userapp/user-file-data.model';

describe('Component Tests', () => {
  describe('UserFileData Management Update Component', () => {
    let comp: UserFileDataUpdateComponent;
    let fixture: ComponentFixture<UserFileDataUpdateComponent>;
    let service: UserFileDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [UserFileDataUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UserFileDataUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserFileDataUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserFileDataService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserFileData(123);
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
        const entity = new UserFileData();
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
