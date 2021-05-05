import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HrmsGatewaySharedModule } from 'app/shared/shared.module';
import { ApplicationRecrutementStatusComponent } from './application-recrutement-status.component';
import { ApplicationRecrutementStatusDetailComponent } from './application-recrutement-status-detail.component';
import { ApplicationRecrutementStatusUpdateComponent } from './application-recrutement-status-update.component';
import { ApplicationRecrutementStatusDeleteDialogComponent } from './application-recrutement-status-delete-dialog.component';
import { applicationRecrutementStatusRoute } from './application-recrutement-status.route';

@NgModule({
  imports: [HrmsGatewaySharedModule, RouterModule.forChild(applicationRecrutementStatusRoute)],
  declarations: [
    ApplicationRecrutementStatusComponent,
    ApplicationRecrutementStatusDetailComponent,
    ApplicationRecrutementStatusUpdateComponent,
    ApplicationRecrutementStatusDeleteDialogComponent,
  ],
  entryComponents: [ApplicationRecrutementStatusDeleteDialogComponent],
})
export class ApplicationappApplicationRecrutementStatusModule {}
