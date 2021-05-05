import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { UserSkillComponent } from './user-skill.component';
import { UserSkillDetailComponent } from './user-skill-detail.component';
import { UserSkillUpdateComponent } from './user-skill-update.component';
import { UserSkillDeleteDialogComponent } from './user-skill-delete-dialog.component';
import { userSkillRoute } from './user-skill.route';

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(userSkillRoute)],
  declarations: [UserSkillComponent, UserSkillDetailComponent, UserSkillUpdateComponent, UserSkillDeleteDialogComponent],
  entryComponents: [UserSkillDeleteDialogComponent],
})
export class DataappUserSkillModule {}
