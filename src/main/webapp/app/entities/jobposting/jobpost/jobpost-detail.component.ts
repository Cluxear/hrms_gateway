import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobpost } from 'app/shared/model/jobposting/jobpost.model';
import { SkillService } from '../../skillapp/skill/skill.service';
import { SkillJobPostService } from '../../dataapp/skill-job-post/skill-job-post.service';

@Component({
  selector: 'jhi-jobpost-detail',
  templateUrl: './jobpost-detail.component.html',
})
export class JobpostDetailComponent implements OnInit {
  jobpost: IJobpost | null = null;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected skillService: SkillService,
    protected jobPostSkills: SkillJobPostService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobpost }) => {
      this.jobpost = jobpost;
      this.skillService.findJpSkills(this.jobpost!.id!).subscribe(val => {
        this.jobpost!.skills = val.body || [];
      });
    });
  }

  previousState(): void {
    window.history.back();
  }
}
