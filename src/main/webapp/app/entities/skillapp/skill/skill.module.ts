import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { SkillComponent } from './skill.component';
import { SkillDetailComponent } from './skill-detail.component';
import { SkillUpdateComponent } from './skill-update.component';
import { SkillDeleteDialogComponent } from './skill-delete-dialog.component';
import { skillRoute } from './skill.route';
import { SkillMatrixComponent } from './skill-matrix.component';

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(skillRoute)],
  declarations: [SkillComponent, SkillDetailComponent, SkillUpdateComponent, SkillDeleteDialogComponent, SkillMatrixComponent],
  entryComponents: [SkillDeleteDialogComponent],
})
export class SkillappSkillModule {}
