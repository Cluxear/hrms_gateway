import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { SeniorityLevelComponent } from './seniority-level.component';
import { SeniorityLevelDetailComponent } from './seniority-level-detail.component';
import { SeniorityLevelUpdateComponent } from './seniority-level-update.component';
import { SeniorityLevelDeleteDialogComponent } from './seniority-level-delete-dialog.component';
import { seniorityLevelRoute } from './seniority-level.route';

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(seniorityLevelRoute)],
  declarations: [
    SeniorityLevelComponent,
    SeniorityLevelDetailComponent,
    SeniorityLevelUpdateComponent,
    SeniorityLevelDeleteDialogComponent,
  ],
  entryComponents: [SeniorityLevelDeleteDialogComponent],
})
export class UserappSeniorityLevelModule {}
