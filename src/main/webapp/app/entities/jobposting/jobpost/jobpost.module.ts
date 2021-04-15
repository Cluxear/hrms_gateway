import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { JobpostComponent } from './jobpost.component';
import { JobpostDetailComponent } from './jobpost-detail.component';
import { JobpostUpdateComponent } from './jobpost-update.component';
import { JobpostDeleteDialogComponent } from './jobpost-delete-dialog.component';
import { jobpostRoute } from './jobpost.route';
import { DataTablesModule } from 'angular-datatables';
import { JoblistingComponent } from './joblisting-component';

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(jobpostRoute), DataTablesModule],
  declarations: [JobpostComponent, JobpostDetailComponent, JobpostUpdateComponent, JobpostDeleteDialogComponent, JoblistingComponent],
  entryComponents: [JobpostDeleteDialogComponent],
})
export class JobpostingJobpostModule {}
