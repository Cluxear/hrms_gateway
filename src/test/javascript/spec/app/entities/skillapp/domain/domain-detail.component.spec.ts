import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { DomainDetailComponent } from 'app/entities/skillapp/domain/domain-detail.component';
import { Domain } from 'app/shared/model/skillapp/domain.model';

describe('Component Tests', () => {
  describe('Domain Management Detail Component', () => {
    let comp: DomainDetailComponent;
    let fixture: ComponentFixture<DomainDetailComponent>;
    const route = ({ data: of({ domain: new Domain(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [DomainDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DomainDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DomainDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load domain on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.domain).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
