import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDegreeLevel } from 'app/shared/model/userapp/degree-level.model';

@Component({
  selector: 'jhi-degree-level-detail',
  templateUrl: './degree-level-detail.component.html',
})
export class DegreeLevelDetailComponent implements OnInit {
  degreeLevel: IDegreeLevel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ degreeLevel }) => (this.degreeLevel = degreeLevel));
  }

  previousState(): void {
    window.history.back();
  }
}
