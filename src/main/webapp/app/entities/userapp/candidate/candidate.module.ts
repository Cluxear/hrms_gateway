import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { CandidateComponent } from './candidate.component';
import { CandidateDetailComponent } from './candidate-detail.component';
import { CandidateUpdateComponent } from './candidate-update.component';
import { CandidateDeleteDialogComponent } from './candidate-delete-dialog.component';
import { candidateRoute } from './candidate.route';
import {SkillappSkillModule} from "app/entities/skillapp/skill/skill.module";
import {FilterPipe} from "app/shared/util/filter.pipe";
import {Ng4LoadingSpinnerModule} from "ng4-loading-spinner";
import {SpinnerComponent} from "app/entities/userapp/candidate/spinner.component";

@NgModule({
    imports: [HrmsGatewaySharedModule, RouterModule.forChild(candidateRoute)],
  declarations: [FilterPipe, CandidateComponent, CandidateDetailComponent, CandidateUpdateComponent, CandidateDeleteDialogComponent, SpinnerComponent],
  entryComponents: [CandidateDeleteDialogComponent],
  exports: [CandidateUpdateComponent],
})
export class UserappCandidateModule {}
