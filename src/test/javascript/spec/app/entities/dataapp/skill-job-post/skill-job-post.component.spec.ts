import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { SkillJobPostComponent } from 'app/entities/dataapp/skill-job-post/skill-job-post.component';
import { SkillJobPostService } from 'app/entities/dataapp/skill-job-post/skill-job-post.service';
import { SkillJobPost } from 'app/shared/model/dataapp/skill-job-post.model';

describe('Component Tests', () => {
  describe('SkillJobPost Management Component', () => {
    let comp: SkillJobPostComponent;
    let fixture: ComponentFixture<SkillJobPostComponent>;
    let service: SkillJobPostService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [SkillJobPostComponent],
      })
        .overrideTemplate(SkillJobPostComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SkillJobPostComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SkillJobPostService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SkillJobPost(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.skillJobPosts && comp.skillJobPosts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
