import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAcademicExperience } from 'app/shared/model/userapp/academic-experience.model';

@Component({
  selector: 'jhi-academic-experience-detail',
  templateUrl: './academic-experience-detail.component.html',
})
export class AcademicExperienceDetailComponent implements OnInit {
  academicExperience: IAcademicExperience | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ academicExperience }) => (this.academicExperience = academicExperience));
  }

  previousState(): void {
    window.history.back();
  }
}
