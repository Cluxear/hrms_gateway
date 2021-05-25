import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { ExperienceDurationComponent } from './experience-duration.component';
import { ExperienceDurationDetailComponent } from './experience-duration-detail.component';
import { ExperienceDurationUpdateComponent } from './experience-duration-update.component';
import { ExperienceDurationDeleteDialogComponent } from './experience-duration-delete-dialog.component';
import { experienceDurationRoute } from './experience-duration.route';

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(experienceDurationRoute)],
  declarations: [
    ExperienceDurationComponent,
    ExperienceDurationDetailComponent,
    ExperienceDurationUpdateComponent,
    ExperienceDurationDeleteDialogComponent,
  ],
  entryComponents: [ExperienceDurationDeleteDialogComponent],
})
export class UserappExperienceDurationModule {}
