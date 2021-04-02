import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserSkill } from 'app/shared/model/dataapp/user-skill.model';
import { UserSkillService } from './user-skill.service';
import { UserSkillDeleteDialogComponent } from './user-skill-delete-dialog.component';

@Component({
  selector: 'jhi-user-skill',
  templateUrl: './user-skill.component.html',
})
export class UserSkillComponent implements OnInit, OnDestroy {
  userSkills?: IUserSkill[];
  eventSubscriber?: Subscription;

  constructor(protected userSkillService: UserSkillService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.userSkillService.query().subscribe((res: HttpResponse<IUserSkill[]>) => (this.userSkills = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserSkills();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserSkill): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserSkills(): void {
    this.eventSubscriber = this.eventManager.subscribe('userSkillListModification', () => this.loadAll());
  }

  delete(userSkill: IUserSkill): void {
    const modalRef = this.modalService.open(UserSkillDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userSkill = userSkill;
  }
}
