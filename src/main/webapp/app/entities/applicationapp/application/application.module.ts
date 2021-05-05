import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { ApplicationComponent } from './application.component';
import { ApplicationDetailComponent } from './application-detail.component';
import { ApplicationUpdateComponent } from './application-update.component';
import { ApplicationDeleteDialogComponent } from './application-delete-dialog.component';
import { applicationRoute } from './application.route';
import { HrmsGatewayProfileModule } from '../../../profile/profile.module';

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(applicationRoute), HrmsGatewayProfileModule],
  declarations: [ApplicationComponent, ApplicationDetailComponent, ApplicationUpdateComponent, ApplicationDeleteDialogComponent],
  entryComponents: [ApplicationDeleteDialogComponent],
})
export class ApplicationappApplicationModule {}
