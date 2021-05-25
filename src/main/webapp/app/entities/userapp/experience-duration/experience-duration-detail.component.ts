import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExperienceDuration } from 'app/shared/model/userapp/experience-duration.model';

@Component({
  selector: 'jhi-experience-duration-detail',
  templateUrl: './experience-duration-detail.component.html',
})
export class ExperienceDurationDetailComponent implements OnInit {
  experienceDuration: IExperienceDuration | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ experienceDuration }) => (this.experienceDuration = experienceDuration));
  }

  previousState(): void {
    window.history.back();
  }
}
