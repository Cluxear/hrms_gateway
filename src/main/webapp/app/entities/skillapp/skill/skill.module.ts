import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { SkillComponent } from './skill.component';
import { SkillDetailComponent } from './skill-detail.component';
import { SkillUpdateComponent } from './skill-update.component';
import { SkillDeleteDialogComponent } from './skill-delete-dialog.component';
import { skillRoute } from './skill.route';
import { SkillMatrixComponent } from './skill-matrix.component';
import { JobpostCandidateSkillsDetailsComponent } from './jobpostCandidateSkills-details.component';
import {SkillCandidateUpdateComponent} from "app/entities/skillapp/skill/skill.candidate.update.component";

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(skillRoute)],
  declarations: [
    SkillComponent,
    SkillDetailComponent,
    SkillUpdateComponent,
    SkillDeleteDialogComponent,
    SkillMatrixComponent,
    JobpostCandidateSkillsDetailsComponent,
    SkillCandidateUpdateComponent
  ],
  entryComponents: [SkillDeleteDialogComponent],
  exports: [SkillMatrixComponent],
})
export class SkillappSkillModule {}
