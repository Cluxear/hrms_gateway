import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISkill } from 'app/shared/model/skillapp/skill.model';
import { SkillService } from './skill.service';
import { SkillDeleteDialogComponent } from './skill-delete-dialog.component';
import { AccountService } from '../../../core/auth/account.service';
import { UserService } from '../../../core/user/user.service';
import { User } from '../../../core/user/user.model';
import { CandidateService } from '../../userapp/candidate/candidate.service';
import { Candidate, ICandidate } from '../../../shared/model/userapp/candidate.model';
import { ActivatedRoute } from '@angular/router';
import { ICandidateSkillMatrix } from '../../../shared/model/skillapp/CandidateSkillMatrix';

@Component({
  selector: 'jhi-skill-matrix-jobpost',
  templateUrl: './jobpostCandidateSkills-details.component.html',
})
export class JobpostCandidateSkillsDetailsComponent implements OnInit, OnDestroy {
  candidateSkills?: ICandidateSkillMatrix[];
  user: ICandidate = new Candidate();
  jobPostId?: number;
  eventSubscriber?: Subscription;

  constructor(
    protected skillService: SkillService,
    protected accountService: AccountService,
    protected candidateService: CandidateService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {}

  loadAll(): void {
    this.activatedRoute.params.subscribe(params => (this.jobPostId = params.jpId));
    // Collect a list of the Skills needed for the jobPost

    this.skillService
      .findCandidateSkillsByJobPostId(this.jobPostId!)
      .subscribe((res: HttpResponse<ICandidateSkillMatrix[]>) => (this.candidateSkills = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();

    this.registerChangeInSkills();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISkill): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSkills(): void {
    this.eventSubscriber = this.eventManager.subscribe('skillListModification', () => this.loadAll());
  }

  delete(skill: ISkill): void {
    const modalRef = this.modalService.open(SkillDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.skill = skill;
  }
}
