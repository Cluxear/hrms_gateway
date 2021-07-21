import {Component, Input, OnInit} from "@angular/core";
import {InterviewService} from "app/entities/interviewapp/interview/interview.service";
import {IInterview} from "app/shared/model/interviewapp/interview.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CandidateDeleteDialogComponent} from "app/entities/userapp/candidate/candidate-delete-dialog.component";
import {InterviewDeleteDialogComponent} from "app/entities/interviewapp/interview/interview-delete-dialog.component";
import {Subscription} from "rxjs";
import {JhiEventManager} from "ng-jhipster";

@Component({
  selector: 'jhi-candidate-interview-list',
  templateUrl: './candidate.interview.list.component.html',
})
export class CandidateInterviewsListComponent implements OnInit {
  interviews? : IInterview[];
  eventSubscriber?: Subscription;

  @Input() applicationId : number | undefined;

    constructor(protected interviewService : InterviewService,
                protected eventManager: JhiEventManager,
                protected modalService: NgbModal,
    ) {


  }
  ngOnInit() : void {
      if (this.applicationId !== undefined) {
        this.interviewService.getByApplicationId(this.applicationId).subscribe((data)=> this.interviews = data.body || [] )
      }
  }

  deleteInterview(interview: IInterview) : void {

      const modalRef = this.modalService.open(InterviewDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.interview = interview;

  }
  registerChangeInInterviews(): void {
    this.eventSubscriber = this.eventManager.subscribe('interviewListModification', () => this.reset());
  }

  reset(): void {
    this.interviews = [];
    this.interviewService.getByApplicationId(this.applicationId!).subscribe((data) => this.interviews = data.body || []);
  }
}
