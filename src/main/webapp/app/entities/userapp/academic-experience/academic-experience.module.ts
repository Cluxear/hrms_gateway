import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { AcademicExperienceComponent } from './academic-experience.component';
import { AcademicExperienceDetailComponent } from './academic-experience-detail.component';
import { AcademicExperienceUpdateComponent } from './academic-experience-update.component';
import { AcademicExperienceDeleteDialogComponent } from './academic-experience-delete-dialog.component';
import { academicExperienceRoute } from './academic-experience.route';

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(academicExperienceRoute)],
  declarations: [
    AcademicExperienceComponent,
    AcademicExperienceDetailComponent,
    AcademicExperienceUpdateComponent,
    AcademicExperienceDeleteDialogComponent,
  ],
  entryComponents: [AcademicExperienceDeleteDialogComponent],
})
export class UserappAcademicExperienceModule {}
