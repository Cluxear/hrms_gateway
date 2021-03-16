import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISeniorityLevel } from 'app/shared/model/userapp/seniority-level.model';

@Component({
  selector: 'jhi-seniority-level-detail',
  templateUrl: './seniority-level-detail.component.html',
})
export class SeniorityLevelDetailComponent implements OnInit {
  seniorityLevel: ISeniorityLevel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ seniorityLevel }) => (this.seniorityLevel = seniorityLevel));
  }

  previousState(): void {
    window.history.back();
  }
}
