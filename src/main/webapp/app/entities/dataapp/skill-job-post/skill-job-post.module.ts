import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { SkillJobPostComponent } from './skill-job-post.component';
import { SkillJobPostDetailComponent } from './skill-job-post-detail.component';
import { SkillJobPostUpdateComponent } from './skill-job-post-update.component';
import { SkillJobPostDeleteDialogComponent } from './skill-job-post-delete-dialog.component';
import { skillJobPostRoute } from './skill-job-post.route';

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(skillJobPostRoute)],
  declarations: [SkillJobPostComponent, SkillJobPostDetailComponent, SkillJobPostUpdateComponent, SkillJobPostDeleteDialogComponent],
  entryComponents: [SkillJobPostDeleteDialogComponent],
})
export class DataappSkillJobPostModule {}
