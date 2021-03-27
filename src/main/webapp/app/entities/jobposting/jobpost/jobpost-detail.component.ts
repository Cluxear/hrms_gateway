import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobpost } from 'app/shared/model/jobposting/jobpost.model';

@Component({
  selector: 'jhi-jobpost-detail',
  templateUrl: './jobpost-detail.component.html',
})
export class JobpostDetailComponent implements OnInit {
  jobpost: IJobpost | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobpost }) => (this.jobpost = jobpost));
  }

  previousState(): void {
    window.history.back();
  }
}
