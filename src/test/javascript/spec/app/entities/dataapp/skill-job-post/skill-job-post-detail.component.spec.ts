import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { SkillJobPostDetailComponent } from 'app/entities/dataapp/skill-job-post/skill-job-post-detail.component';
import { SkillJobPost } from 'app/shared/model/dataapp/skill-job-post.model';

describe('Component Tests', () => {
  describe('SkillJobPost Management Detail Component', () => {
    let comp: SkillJobPostDetailComponent;
    let fixture: ComponentFixture<SkillJobPostDetailComponent>;
    const route = ({ data: of({ skillJobPost: new SkillJobPost(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [SkillJobPostDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SkillJobPostDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SkillJobPostDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load skillJobPost on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.skillJobPost).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
