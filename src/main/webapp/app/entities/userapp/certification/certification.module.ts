import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { CertificationComponent } from './certification.component';
import { CertificationDetailComponent } from './certification-detail.component';
import { CertificationUpdateComponent } from './certification-update.component';
import { CertificationDeleteDialogComponent } from './certification-delete-dialog.component';
import { certificationRoute } from './certification.route';

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(certificationRoute)],
  declarations: [CertificationComponent, CertificationDetailComponent, CertificationUpdateComponent, CertificationDeleteDialogComponent],
  entryComponents: [CertificationDeleteDialogComponent],
})
export class UserappCertificationModule {}
