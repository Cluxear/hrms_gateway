import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { UserInterviewComponent } from './user-interview.component';
import { UserInterviewDetailComponent } from './user-interview-detail.component';
import { UserInterviewUpdateComponent } from './user-interview-update.component';
import { UserInterviewDeleteDialogComponent } from './user-interview-delete-dialog.component';
import { userInterviewRoute } from './user-interview.route';

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(userInterviewRoute)],
  declarations: [UserInterviewComponent, UserInterviewDetailComponent, UserInterviewUpdateComponent, UserInterviewDeleteDialogComponent],
  entryComponents: [UserInterviewDeleteDialogComponent],
})
export class DataappUserInterviewModule {}
