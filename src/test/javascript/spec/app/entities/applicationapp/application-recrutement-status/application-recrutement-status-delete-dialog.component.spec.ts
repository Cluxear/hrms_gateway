import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { MockEventManager } from '../../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../../helpers/mock-active-modal.service';
import { ApplicationRecrutementStatusDeleteDialogComponent } from 'app/entities/applicationapp/application-recrutement-status/application-recrutement-status-delete-dialog.component';
import { ApplicationRecrutementStatusService } from 'app/entities/applicationapp/application-recrutement-status/application-recrutement-status.service';

describe('Component Tests', () => {
  describe('ApplicationRecrutementStatus Management Delete Component', () => {
    let comp: ApplicationRecrutementStatusDeleteDialogComponent;
    let fixture: ComponentFixture<ApplicationRecrutementStatusDeleteDialogComponent>;
    let service: ApplicationRecrutementStatusService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [ApplicationRecrutementStatusDeleteDialogComponent],
      })
        .overrideTemplate(ApplicationRecrutementStatusDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ApplicationRecrutementStatusDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ApplicationRecrutementStatusService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
