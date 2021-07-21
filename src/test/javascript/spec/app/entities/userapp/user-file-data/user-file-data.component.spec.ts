import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { UserFileDataComponent } from 'app/entities/userapp/user-file-data/user-file-data.component';
import { UserFileDataService } from 'app/entities/userapp/user-file-data/user-file-data.service';
import { UserFileData } from 'app/shared/model/userapp/user-file-data.model';

describe('Component Tests', () => {
  describe('UserFileData Management Component', () => {
    let comp: UserFileDataComponent;
    let fixture: ComponentFixture<UserFileDataComponent>;
    let service: UserFileDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [UserFileDataComponent],
      })
        .overrideTemplate(UserFileDataComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserFileDataComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserFileDataService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserFileData(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userFileData && comp.userFileData[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
