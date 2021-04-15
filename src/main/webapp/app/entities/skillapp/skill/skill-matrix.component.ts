import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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

@Component({
  selector: 'jhi-skill-matrix',
  templateUrl: './skill-matrix.component.html',
})
export class SkillMatrixComponent implements OnInit, OnDestroy {
  skills?: ISkill[];
  user: ICandidate = new Candidate();
  eventSubscriber?: Subscription;
  @Input() userId?: string;
  constructor(
    protected skillService: SkillService,
    protected accountService: AccountService,
    protected candidateService: CandidateService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    if (this.userId !== undefined) {
      this.skillService.findSkillsByUserId(this.userId).subscribe(skills => (this.skills = skills.body || []));
    } else {
      const login = this.accountService.getLogin();
      // TODO : add getUserBylogin in userResource
      this.candidateService.findByLogin(login).subscribe((res: HttpResponse<ICandidate>) => {
        this.user = res.body!;
        this.skillService.findSkillsByUserId(this.user.id!).subscribe((ress: HttpResponse<ISkill[]>) => (this.skills = ress.body || []));
      });
    }
  }

  ngOnInit(): void {
    this.loadAll();

    this.registerChangeInSkills();
    console.log(this.skills);
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
