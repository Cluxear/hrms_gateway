import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISkillJobPost } from 'app/shared/model/dataapp/skill-job-post.model';
import { SkillJobPostService } from './skill-job-post.service';
import { SkillJobPostDeleteDialogComponent } from './skill-job-post-delete-dialog.component';

@Component({
  selector: 'jhi-skill-job-post',
  templateUrl: './skill-job-post.component.html',
})
export class SkillJobPostComponent implements OnInit, OnDestroy {
  skillJobPosts?: ISkillJobPost[];
  eventSubscriber?: Subscription;

  constructor(
    protected skillJobPostService: SkillJobPostService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.skillJobPostService.query().subscribe((res: HttpResponse<ISkillJobPost[]>) => (this.skillJobPosts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSkillJobPosts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISkillJobPost): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSkillJobPosts(): void {
    this.eventSubscriber = this.eventManager.subscribe('skillJobPostListModification', () => this.loadAll());
  }

  delete(skillJobPost: ISkillJobPost): void {
    const modalRef = this.modalService.open(SkillJobPostDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.skillJobPost = skillJobPost;
  }
}
